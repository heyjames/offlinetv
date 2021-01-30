export interface Member {
  alias: string;
  name: string;
  stream: {
    id: string;
    label: string;
    url: string;
    live: boolean;
    url_alt: string;
    avatar: string;
    last_stream_date: string;
  },
  api: {
    viewers?: number;
    game?: string;
    stream_started_at?: string;
    title?: string;
    logo?: string;
  },
  links: string[]
}

export interface Notification {
  level?: string;
  message?: string;
}

export interface Theme {
  readonly label: string;
  readonly classLabel: string;
  readonly remark: string;
}