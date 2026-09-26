// English translation of terms.js. Same shape (title + intro + sections[{heading, paras[], label,
// bullets[], after[]}] + contact + definitions + checkbox/button labels), same section numbering and
// order as the Vietnamese original — a faithful translation, not a separate legal text. The Vietnamese
// version in terms.js is the one with legal effect (see legalNote and §6 below); this file exists so
// English-reading users can understand what they are agreeing to. Do not edit TERMS_VERSION here — the
// acceptance record is version-based and version-only, and that version lives in terms.js.
export const TERMS_EN = {
  title: 'Auto Beep TopTop Terms of Use',
  legalNote: 'Bản tiếng Việt là bản có giá trị pháp lý / The Vietnamese version prevails.',
  intro: 'These Terms are an agreement between you ("User") and the author of the Auto Beep TopTop software ("Author") governing use of the Auto Beep TopTop software ("Software"). Please read the entire text carefully. By clicking "Agree", you confirm that you have read, understood and accepted it. If you do not agree, the Software will close and you may not use it.',
  sections: [
    {
      heading: '1. The Software and the parties',
      paras: [
        'Auto Beep TopTop is a personal tool that helps you manage your own TikTok accounts, manage static proxies, and post automated comments on videos ("Beep"). The Software runs entirely on your computer and drives either a bundled browser (Beep Browser, built on open-source Chromium, with a separate profile per account) or Google Chrome already installed on your machine, whichever you choose.',
        'The Author is the individual who develops and publishes the Software. Author: Tạ Ngọc Tú (GitHub: tuleader). The Software is provided free of charge for personal use. There is no intermediary server, no login account for the Software, no license package for sale, and no service contract.',
        'The Software is not affiliated with, sponsored by, or certified by TikTok, ByteDance, Google, or any platform it mentions.',
      ],
    },
    {
      heading: '2. Conditions of use',
      bullets: [
        'You must be at least 18 years old, or at least 15 years old with the consent of a parent or legal guardian under the Civil Code.',
        'You may only use the Software on TikTok accounts you are lawfully entitled to use.',
        'You are responsible for all activity performed with the Software on your machine, including use by other people on that machine.',
      ],
    },
    {
      heading: '3. Rules of use',
      paras: ['You may use the Software for lawful purposes: nurturing, engaging with, and marketing your own TikTok accounts, in compliance with Vietnamese law and the platform\'s terms.'],
      label: 'You are STRICTLY PROHIBITED from using the Software to:',
      bullets: [
        'Oppose the government of the Socialist Republic of Vietnam, or infringe on national security or public order and safety (Cybersecurity Law 2018, Article 8).',
        'Propagate war or terrorism, incite violence, distribute obscene content or superstition, spread false information, or spread content that insults an ethnicity or religion.',
        'Defame or damage the honor, dignity, or reputation of an individual or organization; harass, threaten, or bully others.',
        'Advertise, buy, or sell goods or services prohibited or restricted by law; commit fraud, or assist fraud.',
        'Unlawfully collect or process other people\'s personal data; attack networks; distribute malware; send mass unsolicited messages or comments (spam).',
        'Impersonate an organization or individual; create fake engagement to manipulate a market, a review, or a ranking in violation of applicable rules.',
        'Engage with TikTok accounts you are not entitled to use, or circumvent the platform\'s technical measures for an unlawful purpose.',
      ],
      after: ['You are fully responsible before the law for the content you create and how you use the Software. The Author does not control, does not moderate, and is not responsible for comment content you supply.'],
    },
    {
      heading: '4. Personal data and privacy',
      bullets: [
        'The Software does NOT collect your name, email, phone number, address, or any other personal data; does NOT use analytics tools; does NOT send reports back to the Author.',
        'Data you enter (TikTok accounts, passwords, cookies, proxies, comment banks, logs) is stored in a data folder on your own machine (%APPDATA%\\AutoBeepTopTop). The Author has no access to it and receives none of it.',
        'You are the data controller under the Personal Data Protection Law 2025. If data you enter into the Software contains another person\'s personal data (for example, an account entrusted to you by someone else), you must have a lawful basis for processing it.',
        'Outbound connections are limited to: TikTok (through the browser), proxies you configure, a captcha-solving service (only the captcha challenge image is sent, never account data), a temporary-mailbox service if you use one to receive verification codes, and an IP lookup service when you click to check a proxy.',
        'You are responsible for securing your own computer and data folder. Anyone who can access your machine can read this data; use a machine password and do not share the data folder.',
        'When you uninstall the Software, the data folder is kept so you can decide for yourself whether to delete or keep it.',
      ],
    },
    {
      heading: '5. Resources and third-party services',
      bullets: [
        'TikTok accounts and proxies are yours. The Software does NOT supply, exchange, or distribute accounts, proxies, or any other resource. You are responsible for the origin and legality of those resources.',
        'TikTok is a third-party platform with its own Terms of Service and Community Guidelines. Using automation tools may violate TikTok\'s terms and may lead to accounts being restricted, locked, or deleted. You assess and bear this risk yourself. The Author does NOT guarantee the safety of your accounts.',
        'The bundled Beep Browser is a browser built on open-source Chromium, used to give a separate profile per account (the accounts\' cookies, cache and browser parameters do not mix). This is NOT a guarantee that your accounts are safe or will not be restricted by TikTok. The licenses of Chromium, ungoogled-chromium and fingerprint-chromium are included in the install folder (the `browser` folder). Google Chrome is a Google product; when you choose Chrome, the Software only drives the copy already installed on your machine.',
        'Captcha solving uses a third-party service (omocaptcha). The default package is paid for and maintained by the Author using voluntary contributions; when it runs out, this feature may pause until it is topped up or you enter your own key. This is not a defect of the Software and is not grounds for a claim.',
        'Bundled open-source components (Electron, Chromium, playwright-core, better-sqlite3 and other libraries) are each under their own license; the licenses are included with the installer.',
      ],
    },
    {
      heading: '6. Liability and governing law',
      bullets: [
        'The Software is free and provided "as is": the Author does not warrant that it runs continuously, without errors, or achieves any particular outcome; it may stop working when TikTok changes its interface or policies.',
        'The Author warrants that the parts the Author wrote (the Auto Beep TopTop application and its installer) contain no virus, malware, spyware or tracking code, and never download or run code from any source other than the installer you downloaded. The bundled Beep Browser is an open-source Chromium browser (the same base as Google Chrome) modified by the community: connections to Google removed (ungoogled-chromium) and fingerprint customization added so that each account has its own separate profile (fingerprint-chromium); the Author does not compile Beep Browser, only packages the public build and includes its licenses. The installer is not code-signed, so Windows SmartScreen may warn; that is the default warning for unsigned software, not a finding of malware.',
        'Contributions made through "Support the author" are voluntary, are not a payment for the Software or a service, and are non-refundable. Support is provided through the Author\'s Facebook on a best-effort basis, with no committed response time.',
        'The Author may update the Software or these Terms; a new version is numbered, published on GitHub, and viewable inside the Software. When the Author releases a new version of the Terms, the Software will show them again and ask you to accept before you continue using it; if you do not agree, stop using it and uninstall it.',
        'These Terms are governed by the law of Vietnam; disputes are first resolved by negotiation, otherwise before a competent court in Vietnam. The Vietnamese version is the one with legal effect.',
      ],
    },
    {
      heading: '7. Agreement',
      paras: ['By clicking "Agree", you confirm that you have read, understood, and accepted all of the Terms above, and confirm that you meet the conditions in Section 2. If you do not agree, click "Disagree" — the Software will close.'],
    },
  ],
  contact: { facebook: 'https://www.facebook.com/100017717225379', github: 'https://github.com/tuleader/auto-beep-toptop' },
  definitions: [
    ['"Software"', 'Auto Beep TopTop, comprising the application, source code and documentation developed by the Author, together with the packaged Beep Browser (see Sections 5 and 6).'],
    ['"Author"', 'Tạ Ngọc Tú (GitHub: tuleader), the individual who develops and publishes the Software, reachable through the channel in the Contact section.'],
    ['"You" / "User"', 'The individual who installs and uses the Software on their own computer.'],
    ['"Beep"', 'A single automated comment posted on a TikTok video by the Software.'],
    ['"Third-party resources"', 'TikTok accounts, proxies, Google Chrome, Chromium, the captcha-solving service, and the mailbox service — none of which are under the Author\'s control.'],
    ['"Personal data"', 'As defined in the Personal Data Protection Law 2025.'],
  ],
  checkbox1: 'I have read and understood the Terms of Use',
  checkbox2: 'I agree to the Terms of Use and confirm that I meet the conditions to use the Software',
  acceptedAtLabel: 'You accepted these Terms on:',
  agree: 'Agree',
  disagree: 'Disagree',
  disagreeConfirm: 'Disagreeing to the Terms means you cannot use the Software. Quit the app?',
};
