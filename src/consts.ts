import {
  techStackLabelType,
  sectionLabelsType,
  serviceType
} from './const.d'
export const hero = {
  en: {
    title: 'FullStack Developer',
    subtitle: 'With a passion for creating robust and intuitive softwares.',
    catchphrase: 'Developer onDemand',
    location: 'From Calgary AB, Canada'
  },
  jp: {
    title: 'フルスタック 開発者',
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

export const email_labels = {
  en: {
    name: 'Name',
    email: 'Email',
    message: 'Message' 
  },
  jp: {
    name: '名前',
    email: 'メールアドレス',
    message: 'メッセージ' 
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