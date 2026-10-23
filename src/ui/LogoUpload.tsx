import { useRef, useState } from 'react';
import { Icon } from '../components/Icon';

/**
 * The logo uploader. Before a logo is in: a dashed drop box ("Drag and drop your logo or Browse in my
 * files"). After: just the uploaded image with a ✕ to remove it. It hands back the image as a data URL.
 * disabled makes the drop box inert and greys it out.
 */
type Props = { logo: string; disabled: boolean; onChange: (dataUrl: string) => void; describedBy?: string };

const TYPES = /^image\/(png|jpeg|svg\+xml)$/;

export function LogoUpload({ logo, disabled, onChange, describedBy }: Props) {
  const [error, setError] = useState('');
  const fileInput = useRef<HTMLInputElement>(null);

  const pickFile = (f?: File) => {
    if (!f) return;
    if (!TYPES.test(f.type)) return setError('Choose a PNG, SVG or JPG file');
    setError('');
    const r = new FileReader();
    r.onload = () => onChange(String(r.result));
    r.readAsDataURL(f);
  };

  if (logo.startsWith('data:'))
    return (
      <div className="br-logo-tile">
        <img src={logo} alt="Uploaded logo" />
        <button type="button" className="br-logo-x" aria-label="Remove logo" onClick={() => onChange('')}>
          <Icon name="Close" size={20} />
        </button>
      </div>
    );

  return (
    <>
      <input
        ref={fileInput}
        className="ux-visually-hidden"
        type="file"
        accept="image/png,image/svg+xml,image/jpeg"
        tabIndex={-1}
        aria-hidden="true"
        onChange={(e) => {
          pickFile(e.target.files?.[0]);
          e.target.value = '';
        }}
      />
      <div
        className={`br-drop${disabled ? ' is-disabled' : ''}`}
        inert={disabled}
        aria-disabled={disabled || undefined}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          pickFile(e.dataTransfer.files?.[0]);
        }}
      >
        <Icon name="FileUpload" size={32} />
        <p>
          Drag and drop your logo or{' '}
          <button type="button" className="up-browse" aria-describedby={describedBy} onClick={() => fileInput.current?.click()}>
            Browse in my files
          </button>
        </p>
      </div>
      {error && (
        <p className="br-error" role="alert">
          <Icon name="ErrorOutline" size={16} />
          {error}
        </p>
      )}
    </>
  );
}
