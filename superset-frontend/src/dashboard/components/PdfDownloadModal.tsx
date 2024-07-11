import React from 'react';
import {styled, t} from '@superset-ui/core';
import Button from 'src/components/Button';

import ModalTrigger, {ModalTriggerRef} from 'src/components/ModalTrigger';
import {FormLabel} from 'src/components/Form';

const StyledModalTrigger = styled(ModalTrigger)`
  .ant-modal-body {
    overflow: visible;
  }
`;

type PdfDownloadModalProps = {
  triggerNode: JSX.Element;
  onSaveHandler: (closeModal: any) => void;
  isLoading: boolean;
};

type PdfDownloadModalState = {
  isLoading: boolean;
};

class PdfDownloadModal extends React.PureComponent<
  PdfDownloadModalProps,
  PdfDownloadModalState
> {
  static defaultProps = {
    isLoading: false,
  };

  modalRef: ModalTriggerRef | null;

  constructor(props: PdfDownloadModalProps) {
    super(props);
    this.modalRef = React.createRef() as ModalTriggerRef;
    this.state = {
      isLoading: props.isLoading
    };
    this.onSave = this.onSave.bind(this);
    this.onCancel = this.onCancel.bind(this);
  }

  onSave() {
    this.props.onSaveHandler(() => {
      this.modalRef?.current?.close();
    });
  }

  onCancel() {
    this.setState({});
    this.modalRef?.current?.close();
  }

  render() {
    const {isLoading} = this.props;

    return (
      <StyledModalTrigger
        ref={this.modalRef}
        triggerNode={this.props.triggerNode}
        modalTitle={t('Download dashboard')}
        modalBody={
          <div>
            <FormLabel>{t('Download dashboard as PDF')}</FormLabel>
          </div>
        }
        modalFooter={
          <>
            <Button
              buttonStyle="primary"
              buttonSize="small"
              onClick={this.onSave}
              loading={isLoading}
            >
              {t('Download')}
            </Button>
            <Button onClick={this.onCancel} buttonSize="small">
              {t('Cancel')}
            </Button>
          </>
        }
      />
    );
  }
}

export default PdfDownloadModal;
