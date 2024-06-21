import {
  ControlSetItem,
  CustomControlConfig,
  InfoTooltipWithTrigger,
} from '@superset-ui/chart-controls';
import {
  SLOW_DEBOUNCE,
  t,
  useTheme,
  validateNonEmpty,
} from '@superset-ui/core';
import React from 'react';
import { debounce } from 'lodash';
import ReactQuill from 'react-quill';
import { ControlHeader } from '../components/ControlHeader/controlHeader';
import 'react-quill/dist/quill.snow.css';

interface TextEditorControlProps {
  value: string;
}

const debounceFunc = debounce(
  (func: (val: string) => void, source: string) => func(source),
  SLOW_DEBOUNCE,
);

const TextEditorControl = (
  props: CustomControlConfig<TextEditorControlProps>,
) => {
  const val = String(
    props?.value ? props?.value : props?.default ? props?.default : '',
  );
  const theme = useTheme();

  return (
    <div>
      <ControlHeader>
        <div>
          {props.label}
          <InfoTooltipWithTrigger
            iconsStyle={{ marginLeft: theme.gridUnit }}
            tooltip={t(props.description)}
          />
        </div>
      </ControlHeader>
      <div>
        <ReactQuill
          theme="snow"
          value={val}
          onChange={source => {
            debounceFunc(props.onChange, source || '');
          }}
        />
      </div>
    </div>
  );
};

export const textEditorControl: ControlSetItem = {
  name: 'text_editor_control',
  config: {
    type: TextEditorControl,
    label: t('Type'),
    description: t('Text Editor Control'),
    default: `test`,
    renderTrigger: true,
    validators: [validateNonEmpty],
    mapStateToProps: ({ controls }) => ({
      value: controls?.handlebars_template?.value,
    }),
  },
};
