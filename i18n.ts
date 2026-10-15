import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  const validLocale = (locale || 'en') as 'en' | 'ar';
  
  console.log('--- NEXT-INTL DEBUG ---');
  console.log('1. Requested locale:', locale);
  console.log('2. Resolved locale:', validLocale);
  
  try {
    const messagesModule = await import(`./messages/${validLocale}.json`);
    const messages = messagesModule.default;
    
    console.log('3. Successfully loaded file for:', validLocale);
    console.log('4. Hero titleLine1 is:', messages?.Hero?.titleLine1);
  } catch (error) {
    console.error('5. ERROR LOADING FILE:', error);
  }
  console.log('-----------------------');

  return {
    locale: validLocale,
    messages: (await import(`./messages/${validLocale}.json`)).default
  };
});