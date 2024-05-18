import {
  techStackLabelType,
  sectionLabelsType,
  serviceType,
  hireContentType,
  EmailLabelsFullType,
  contactContentType,
  emailSuccessMessageType
} from './const.d'
export const hero = {
  en: {
    title: 'FullStack Developer',
    subtitle: 'With a passion for creating robust and intuitive softwares.',
    catchphrase: 'Developer onDemand',
    location: 'From Calgary AB, Canada'
  },
  jp: {
    title: '<span style="white-space:nowrap">フルスタック</span><br />開発者',
    subtitle: '信頼できる本格的なソフトウェア開発をご提供いたします。',
    catchphrase: '必要な時だけ雇える系',
    location: 'カナダ　から　日本へ'
  }
}

export const service:serviceType = {
  en: [
    'Web Development',
    'Mobile Development',
    'API Development',
    'Jest Testing',
    'CI/CD',
    'counseling',
    'Scrum Master'
  ],
  jp: [
    'ホームページ開発',
    'アプリ開発',
    'API 開発',
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
  hire: {
    en: 'HIRE ME',
    jp: '採用方法'
  }
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
  en: 'I am currently open for permanent, contract, and/or freelancing. <br />Feel free to contact me via message form below or social platform',
  jp: '日本からのコントラクトかフリーランスの仕事をお引き受けいたします。<br />メッセージフォームからお気軽にお問い合わせください。'
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
      { id: '',
        title: '',
        years: '',
        company: '',
        description: '',
        locale: 'en'
      }
    ],
    jp: [
      { id: '',
        title: '',
        years: '',
        company: '',
        description: '',
        locale: 'jp'
      }
    ]
  },
  project: {
    en: [{
      id: '',
      title: '',
      year: '',
      description: '',
      link: '',
      locale: 'en'
    }],
    jp: [
      {
        id: '',
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
          id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          id: '',
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
          id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          id: '',
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
          id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          id: '',
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
          id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ],
      jp: [
        {
          id: '',
          label: '',
          name: '',
          icon: '',
          locale: 'en',
        }
      ]
    }
    
  },
  hero: {
    en: {
      catchphrase: '',
      location: '',
      subtitle: '',
      title: '',
    },
    jp: {
      catchphrase: '',
      location: '',
      subtitle: '',
      title: '',
    }
  },
  service: {
    en: [''],
    jp: ['']
  },
  email_labels: {
    en: {
      name:'',
      email:'',
      message:'',
      submit:'',
    },
    jp: {
      name:'',
      email:'',
      message:'',
      submit:'',
    }
  }
}