/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, {useState} from 'react';
import { Menu } from 'src/components/Menu';
import { useSelector } from 'react-redux';
import { getClientErrorObject, t } from '@superset-ui/core';
import { saveAs } from 'file-saver';
import { fetchDashboardPdf } from 'src/utils/urlUtils';
import { RootState } from '../../../types';
import PdfDownloadModal from '../../PdfDownloadModal';

export default function DownloadDashboardAsPdf({
  dashboardId,
  text,
  logEvent,
  dashboardTitle,
  addDangerToast,
  ...rest
}: {
  dashboardId: number;
  text: string;
  addDangerToast: Function;
  dashboardTitle: string;
  logEvent?: Function;
}) {
  const activeTabs = [];
  const [isLoading, setIsLoading] = useState(false);
  const { dataMask, dashboardTabs } = useSelector((state: RootState) => ({
    dataMask: state.dataMask,
    dashboardTabs:
      state.dashboardInfo.metadata.native_filter_configuration[0].tabsInScope,
  }));

  const getDashboardPdf = async (closeModal: () => void) => {
    setIsLoading(true);
    try {
      const response = await fetchDashboardPdf({
        dashboardId,
        dataMask,
        dashboardTabs,
        activeTabs,
        dashboardTitle,
      });

      const formattedDate = new Date()
        .toISOString()
        .replace(/[-:.]/g, '')
        .slice(0, 15);
      const filename = `${dashboardTitle}_${formattedDate}`;
      const { blob } = response;
      saveAs(blob, filename);
    } catch (error) {
      if (error) {
        addDangerToast(
          t('Failed to retrieve pdf report.')
        );
      }
    } finally {
      setIsLoading(false);
      closeModal();
    }
  };

  return (
    <Menu.Item key="download-pdf" {...rest}>
      <PdfDownloadModal
        onSaveHandler={getDashboardPdf}
        isLoading={isLoading}
        triggerNode={<span>{t(text)}</span>}
      />
    </Menu.Item>
  );
}
