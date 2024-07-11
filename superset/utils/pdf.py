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

from superset.commands.report.exceptions import ReportSchedulePdfFailedError

logger = logging.getLogger(__name__)
try:
    from PIL import Image
except ModuleNotFoundError:
    logger.info("No PIL installation found")

def build_pdf_from_screenshots(snapshots: list[bytes]) -> bytes:
    images = []

    for snap in snapshots:
        byte_img = BytesIO(snap)
        byte_img.seek(0)
        img = Image.open(BytesIO(snap))
        if img.mode == "RGBA":
            img = img.convert("RGB")
        temp_img = tempfile.NamedTemporaryFile(delete=False, suffix=".png")
        img.save(temp_img, format="PNG")
        images.append(temp_img.name)

    logger.info("building pdf")

    try:
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

        for temp_img in images:
            os.remove(temp_img)

    except Exception as ex:
        raise ReportSchedulePdfFailedError(
            f"Failed converting screenshots to pdf {str(ex)}"
        ) from ex

    return new_pdf
