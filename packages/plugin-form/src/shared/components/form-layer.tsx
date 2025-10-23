import { useCallback, useEffect, useState } from '@framework';
import type { CSSProperties, HTMLAttributes } from '@framework';

import { FormFieldValue, ignore, PdfWidgetAnnoObject } from '@embedpdf/models';

import { Field } from './field';
import { useFormPlugin } from '../hooks/use-form';

type FormLayerProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'> & {
  pageIndex: number;
  /**
   * The scale factor for rendering the page.
   */
  editable?: boolean;
  scale?: number;
  style?: CSSProperties;
};

export function FormLayer({ pageIndex, scale, style, editable, ...props }: FormLayerProps) {
  const { plugin: formPlugin } = useFormPlugin();

  const [annoWidgets, setAnnoWidgets] = useState<PdfWidgetAnnoObject[]>([]);

  useEffect(() => {
    if (!formPlugin) return;
    const task = formPlugin.getPageFormAnnoWidgets(pageIndex);
    task.wait(setAnnoWidgets, ignore);
  }, [formPlugin, pageIndex]);

  const onChangeValues = useCallback(
    (annotation: PdfWidgetAnnoObject, values: FormFieldValue[]) => {
      if (!formPlugin) return;
      const task = formPlugin.setFormFieldValues(pageIndex, annotation, values);
      task.wait(ignore, ignore);
    },
    [formPlugin, pageIndex],
  );

  return (
    <div style={style} {...props}>
      {annoWidgets.map((annoWidget) => (
        <Field
          key={annoWidget.id}
          scale={scale || 1}
          pageIndex={pageIndex}
          annotation={annoWidget}
          field={annoWidget.field}
          isEditable={editable ?? true}
          values={[]}
          onChangeValues={(values) => onChangeValues(annoWidget, values)}
        />
      ))}
    </div>
  );
}
