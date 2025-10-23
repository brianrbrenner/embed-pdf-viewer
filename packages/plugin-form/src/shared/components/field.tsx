import { Fragment } from '@framework';
import { PDF_FORM_FIELD_FLAG, PDF_FORM_FIELD_TYPE } from '@embedpdf/models';
import { CheckboxField } from './fields/checkbox';
import { ComboboxField } from './fields/combobox';
import { FieldProps } from './types';
import { PushButtonField } from './fields/push-button';
import { RadioButtonField } from './fields/radio-button';
import { RenderWidget } from './render-widget';
import { TextField } from './fields/text';

/**
 *
 * @param props - properties of Field
 * @returns Field component
 */
export function Field(props: FieldProps) {
  const { field, isEditable } = props;

  let content = null;
  const { type } = field;

  switch (type) {
    case PDF_FORM_FIELD_TYPE.TEXTFIELD:
      content = <TextField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.CHECKBOX:
      content = <CheckboxField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.RADIOBUTTON:
      content = <RadioButtonField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.COMBOBOX:
      content = <ComboboxField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.LISTBOX:
      content = <ComboboxField {...props} />;
      break;
    case PDF_FORM_FIELD_TYPE.PUSHBUTTON:
      content = <PushButtonField {...props} />;
      break;
    default:
      break;
  }

  return (
    <div
      style={{
        left: props.annotation.rect.origin.x * props.scale,
        top: props.annotation.rect.origin.y * props.scale,
        width: props.annotation.rect.size.width * props.scale,
        height: props.annotation.rect.size.height * props.scale,
        fontSize: 10 * props.scale,
        position: 'absolute',
      }}
    >
      {content}
    </div>
  );
}
