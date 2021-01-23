import { themes, Theme } from '../models/themes';

export interface FooterProps {
  themes: Theme[],
  themeID: number,
  setThemeID: any,
  setShowAboutMessage: any,
  showAboutMessage: any
}

const Footer: React.SFC<FooterProps> = ({ themeID, setThemeID, showAboutMessage, setShowAboutMessage}) => {

//   const aboutTitle: string = `I made this to quickly find Offline TV and \
// related live streamers across platforms.`;

  return (
    <div className="footer">
      <span
        className="theme-label about button"
        onClick={() => setShowAboutMessage(!showAboutMessage)}
      >
        About
      </span>

      <span className="theme">
        <i
          className="fas fa-caret-left theme-back button"
          onClick={() => setThemeID((themeID - 1 + themes.length) % themes.length)}
        >
        </i>

        <span
          className="theme-label"
          title={themes[themeID] && themes[themeID].remark}
        >
          {themes[themeID] && themes[themeID].label}
        </span>
        
        <i
          className="fas fa-caret-right theme-forward button"
          onClick={() => setThemeID((themeID + 1) % themes.length)}
        >
        </i>
      </span>
    </div>
  );
}
 
export default Footer;