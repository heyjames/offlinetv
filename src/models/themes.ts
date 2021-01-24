export interface Theme {
  readonly label: string;
  readonly classLabel: string;
  readonly remark: string;
}

export const themes: Theme[] = [
  {
    label: "Dark",
    classLabel: "theme-dark",
    remark: ""
  },
  {
    label: "Darker",
    classLabel: "theme-darker",
    remark: ""
  },
  {
    label: "Light",
    classLabel: "theme-light",
    remark: ""
  },
  {
    label: "LilyPichu",
    classLabel: "theme-light theme-lilypichu",
    remark: "My eyes!"
  },
  {
    label: "Sykkuno",
    classLabel: "theme-light theme-sykkuno",
    remark: "Just for fun, guys"
  }
];