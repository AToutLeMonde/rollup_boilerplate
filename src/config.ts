export const config = {
  formId: 'process.env.CSS_FORM_LOCATOR',
  backendEnpoint: 'process.env.BACKEND_URL' 
}

export const getFormTagParameter = (attributeName: string) => {
  return document?.querySelector(`#${config.formId}`)?.getAttribute(attributeName)
}