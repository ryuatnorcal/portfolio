import {
  techStackLabelType,
  sectionLabelsType,
  serviceType,
  hireContentType,
  EmailLabelsFullType,
  contactContentType,
  emailSuccessMessageType,
  hireButtonLabelType
} from './const.d'
export const hero = {
  en: {
    title: 'FullStack Developer',
    subtitle: 'With a passion for creating robust and intuitive softwares.',
    catchphrase: '',
    location: 'From Calgary AB, Canada'
  },
  jp: {
    title: '<span style="white-space:nowrap">フルスタック</span><br />開発者',
    subtitle: '信頼できる本格的なソフトウェア開発をご提供いたします。',
    catchphrase: '',
    location: 'カナダ　から　日本へ'
  }
}

export const service:serviceType = {
  en: [
    'Web Development',
    'Mobile Development',
    'API Development',
    'AI/LLM Integration',
    'Jest Testing',
    'CI/CD',
    'Consultant',
    'Scrum Master'
  ],
  jp: [
    'ホームページ開発',
    'アプリ開発',
    'API 開発',
    'AI/LLM 開発',
    'Jest テスト',
    'CI/CD',
    'コンサルタント',
    'スクラムマスター'
  ]
}

export const email_labels:EmailLabelsFullType = {
  en: {
    name: 'Name',
    email: 'Email',
    message: 'Message',
    submit: 'Submit'
  },
  jp: {
    name: '名前',
    email: 'メールアドレス',
    message: 'メッセージ',
    submit: '送信'
  }
}

export const sectionLabels:sectionLabelsType = {
  service: {
    en: 'SERVICES',
    jp: 'サービス'
  },
  tech: {
    en: 'TECH STACK',
    jp: '技術スタック'
  },
  experience: {
    en: 'EXPERIENCES',
    jp: '経験'
  },
  project: {
    en: 'PROJECTS',
    jp: 'プロジェクト'
  },
  internalTools: {
    en: 'INTERNAL TOOLS',
    jp: '社内ツール'
  },
  hire: {
    en: 'HIRE ME',
    jp: '採用方法'
  }
}

// Default text under the Internal Tools heading; edited in the dashboard.
export const internalToolsDescription = {
  en: 'Self-hosted tools I built and use every day to run my finances, work and training.',
  jp: '日々の家計・仕事・トレーニングの管理のために自作し、毎日使っているセルフホスト型のツールです。',
}

// Labels for the right-hand section navigation (SideNav)
export const sideNavLabels: { [section: string]: { [locale: string]: string } } = {
  home: { en: 'Home', jp: 'ホーム' },
  service: { en: 'Services', jp: 'サービス' },
  tech: { en: 'Tech Stack', jp: '技術スタック' },
  about: { en: 'About', jp: '自己紹介' },
  experience: { en: 'Experience', jp: '経験' },
  project: { en: 'Projects', jp: 'プロジェクト' },
  internalTools: { en: 'Internal Tools', jp: '社内ツール' },
  hire: { en: 'Hire Me', jp: '採用方法' },
}

export const techStackLabels: techStackLabelType = {
  en: {
    frontend: 'Frontend',
    backend: 'Backend',
    devops: 'DevOps',
    tools: 'Tools'
  },
  jp: {
    frontend: 'フロントエンド',
    backend: 'バックエンド',
    devops: '開発環境設定',
    tools: 'ツール'
  }
}

export const hireContent: hireContentType = {
  en: 'I am currently open for permanent, contract, and/or freelancing. <br />Feel free to contact me via <a href="/contact">contact page</a>',
  jp: '日本からのコントラクトかフリーランスの仕事をお引き受けいたします。<br /><a href="/contact">contact page</a>からお気軽にお問い合わせください。'
}

export const hireButtonLabel: hireButtonLabelType = {
  en: 'Let\'s Connect',
  jp: 'お問い合わせ'
}

export const contactContent: contactContentType = {
  en: {
    catchphrase: 'Let\'s Talk',
    msg: 'I will get back to you ASAP!'
  },
  jp: {
    catchphrase: 'お問い合わせ',
    msg: 'できるだけ早く返信いたします。'
  }
}
export const emailSuccessMessage: emailSuccessMessageType = {
  en: 'Your message has been successfully sent. Thank you!',
  jp: 'メッセージを送信しました。ありがとうございます。'
}

export const initialContentProps = {
  isLoading: true,
  hasError: false,
  bio: {
    en: {
      name: '',
      title: '',
      description: '',
      locale: 'en'
    },
    jp: {
      name: '',
      title: '',
      description: '',
      locale: 'jp'
    }
  },
  experience: {
    en: [
      { _id: '',
        title: '',
        years: '',
        company: '',
        description: '',
        locale: 'en',
        seq: ''
      }
    ],
    jp: [
      { _id: '',
        title: '',
        years: '',
        company: '',
        description: '',
        locale: 'jp',
        seq: ''
      }
    ]
  },
  project: {
    en: [{
      _id: '',
      title: '',
      year: '',
      description: '',
      link: '',
      locale: 'en'
    }],
    jp: [
      {
        _id: '',
        title: '',
        year: '',
        description: '',
        link: '',
        locale: 'jp'
      }
    ]
  },
  techStack: {
    frontend: {
      en: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ]
    },
    backend: {
      en: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ]
    },
    devops: {
      en: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ]
    },
    tools: {
      en: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          _id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ]
    }
    
  },
  service: {
    en: [],
    jp: []
  },
  internalTools: {
    en: [],
    jp: []
  },
  // filled from siteTextDefaults by ContentProvider
  text: {}
}