interface configProp {
  readonly configUrl: string
  readonly baseUrl: string
}

let config: configProp = {
  configUrl: '/ics',
  baseUrl: 'api/front/v1',
}
export default {
  ...config,
}
