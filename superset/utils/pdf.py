# Licensed to the Apache Software Foundation (ASF) under one
# or more contributor license agreements.  See the NOTICE file
# distributed with this work for additional information
# regarding copyright ownership.  The ASF licenses this file
# to you under the Apache License, Version 2.0 (the
# "License"); you may not use this file except in compliance
# with the License.  You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing,
# software distributed under the License is distributed on an
# "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
# KIND, either express or implied.  See the License for the
# specific language governing permissions and limitations
# under the License.

import logging
import os
from io import BytesIO
import tempfile
import pypdf
import pytesseract
import subprocess

from superset.commands.report.exceptions import ReportSchedulePdfFailedError

logger = logging.getLogger(__name__)
try:
    from PIL import Image
except ModuleNotFoundError:
    logger.info("No PIL installation found")

def build_pdf_from_screenshots(snapshots: list[bytes]) -> bytes:
    images = []
    temp_images = []

    try:
        # Попередня обробка зображень за допомогою ImageMagick
        for idx, snap in enumerate(snapshots):
            if snap is None:
                raise ValueError("Snapshot is None")

            with tempfile.NamedTemporaryFile(delete=False, suffix=".png") as temp_image:
                temp_image.write(snap)
                temp_image_name = temp_image.name
                temp_images.append(temp_image_name)

                # Зменшення розміру зображень з контролем якості
                optimized_image_name = temp_image_name.replace(".png", "_optimized.png")
                convert_command = [
                    "convert",
                    temp_image_name,
                    optimized_image_name
                ]
                result = subprocess.run(convert_command, check=True)
                if result.returncode != 0:
                    raise Exception(f"ImageMagick convert command failed with return code {result.returncode}")

                img = Image.open(optimized_image_name)
                if img.mode == "RGBA":
                    img = img.convert("RGB")
                images.append(img)

        logger.info("building pdf")

        pdf_writer = pypdf.PdfWriter()
        custom_oem_psm_config = r'--oem 3 --psm 11'
        for image in images:
            page = pytesseract.image_to_pdf_or_hocr(image, extension='pdf', lang='ukr+eng', config=custom_oem_psm_config)

            pdf = pypdf.PdfReader(BytesIO(page))
            pdf_writer.add_page(pdf.get_page(0))

        output_pdf = BytesIO()
        pdf_writer.write(output_pdf)
        output_pdf.seek(0)
        new_pdf = output_pdf.read()

        for temp_img in temp_images:
            os.remove(temp_img)
            optimized_image_name = temp_img.replace(".png", "_optimized.png")
            os.remove(optimized_image_name)

    except Exception as ex:
        logger.error(f"Failed converting screenshots to pdf: {str(ex)}")
        raise ReportSchedulePdfFailedError(
            f"Failed converting screenshots to pdf {str(ex)}"
        ) from ex

    return new_pdf
