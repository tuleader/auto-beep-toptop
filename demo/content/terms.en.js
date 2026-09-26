// English translation of terms.js. Same shape (title + intro + sections[{heading, paras[], label,
// bullets[], after[]}] + contact + definitions + checkbox/button labels), same section numbering and
// order as the Vietnamese original — a faithful translation, not a separate legal text. The Vietnamese
// version in terms.js is the one with legal effect (see legalNote and §11 below); this file exists so
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
        'Auto Beep TopTop is a personal tool that helps you manage your own TikTok accounts, manage static proxies, and post automated comments on videos ("Beep"). The Software runs entirely on your computer and drives either a bundled browser (Beep Browser, built on open-source Chromium with fingerprint patches) or Google Chrome already installed on your machine, whichever you choose.',
        'The Author is the individual who develops and publishes the Software. The Software is provided free of charge for personal use. There is no intermediary server, no login account for the Software, no license package for sale, and no service contract.',
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
        'The bundled Beep Browser is an open-source Chromium build (BSD-3-Clause license) with fingerprint patches. The fingerprint feature is only meant to reduce the chance that several accounts on the same machine are recognized as one; it is NOT a guarantee of not being detected. Google Chrome is a Google product; when you choose Chrome, the Software only drives the copy already installed on your machine.',
        'Captcha solving uses a third-party service (omocaptcha). The default package is paid for and maintained by the Author using voluntary contributions; when it runs out, this feature may pause until it is topped up or you enter your own key. This is not a defect of the Software and is not grounds for a claim.',
        'Bundled open-source components (Electron, Chromium, playwright-core, better-sqlite3 and other libraries) are each under their own license; the licenses are included with the installer.',
      ],
    },
    {
      heading: '6. Intellectual property',
      bullets: [
        'The source code, interface design, name, and Auto Beep TopTop logo belong to the Author and are protected under the Law on Intellectual Property.',
        'You are granted a non-exclusive, non-transferable license to use the Software for personal purposes. You may not sell it, rent it out, repackage it as another product, remove copyright notices, or claim the Software as your own.',
        'You may not use the Software\'s or the Author\'s name or logo to advertise your own services without prior written consent.',
      ],
    },
    {
      heading: '7. No warranty; limitation of liability',
      bullets: [
        'The Software is provided "AS IS" and "AS AVAILABLE", without any warranty, express or implied, of fitness for a particular purpose, continuity, error-free operation, or any particular outcome. The Software may stop working when TikTok changes its interface or policies.',
        'To the maximum extent permitted by law, the Author is not liable for any direct, indirect, incidental, special, or consequential damages (loss of an account, loss of data, loss of revenue, loss of business opportunity, penalties from the platform) arising from use or inability to use the Software, even if advised of the possibility of such damages.',
        'Because the Software is free, the Author\'s total liability (if any) shall in no case exceed 0 VND. This does not exclude liability that the law does not permit to be excluded.',
        'You agree to defend and indemnify the Author against any third-party claim or demand arising from your violation of these Terms or of the law while using the Software.',
      ],
    },
    {
      heading: '8. Support, contributions, and refunds',
      bullets: [
        'Support and usage guidance are provided through the Author\'s Facebook (https://www.facebook.com/100017717225379) on a best-effort basis, with no committed response time and no hotline.',
        'Any contribution made through "Support the author" is voluntary, is not a payment to purchase the Software or a service, comes with no perk, commitment, or priority of any kind, and is non-refundable.',
        'Because there is no mandatory fee, no paid-warranty or refund policy applies; your statutory rights, if any, remain unaffected.',
      ],
    },
    {
      heading: '9. Updates, suspension, termination',
      bullets: [
        'The Author may release updates, change or remove features, or stop developing or maintaining the captcha service at any time without prior notice.',
        'You may terminate by uninstalling the Software. The Author may terminate your right to use it if you violate these Terms.',
        'The provisions on intellectual property, limitation of liability, indemnification, and governing law survive termination.',
      ],
    },
    {
      heading: '10. Changes to these Terms',
      bullets: [
        'The Author may amend these Terms to comply with the law or to reflect changes to the Software. A new version is numbered and dated, published on the Software\'s GitHub page, and viewable inside the Software under "Terms".',
        'Continuing to use the Software after a new version is published means you accept the new version. If you do not agree, stop using the Software and uninstall it.',
      ],
    },
    {
      heading: '11. Governing law and dispute resolution',
      bullets: [
        'These Terms are governed by the law of Vietnam. Users outside Vietnam must also comply with the law of their own country.',
        'Any dispute is first resolved through negotiation or mediation via the channel in the Contact section. If no agreement is reached, it is brought before a competent court in Vietnam.',
        'If any part of these Terms is held invalid, the remaining parts remain in effect. These Terms are the entire agreement between you and the Author regarding the Software. The Vietnamese version is the version that has legal effect.',
        'The Author is not liable for failure to perform an obligation due to a force majeure event (natural disaster, epidemic, Internet infrastructure failure, or a change made by a third-party platform).',
      ],
    },
    {
      heading: '12. Legal basis',
      paras: ['These Terms are drafted based on the legal instruments in effect at the time of publication:'],
      bullets: [
        'Civil Code 2015 (No. 91/2015/QH13).',
        'Cybersecurity Law 2018 (No. 24/2018/QH14, effective 01/01/2019).',
        'Law on Intellectual Property 2005, as amended in 2009, 2019, 2022 (Law No. 07/2022/QH15, effective 01/01/2023).',
        'Law on Electronic Transactions 2023 (No. 20/2023/QH15, effective 01/07/2024) — electronic consent given by clicking "Agree" in the Software is legally valid.',
        'Law on Protection of Consumers\' Rights 2023 (No. 19/2023/QH15, effective 01/07/2024).',
        'Decree 147/2024/ND-CP on management, provision, and use of Internet services and online information (effective 25/12/2024, replacing Decree 72/2013/ND-CP).',
        'Personal Data Protection Law 2025 (No. 91/2025/QH15, effective 01/01/2026, replacing Decree 13/2023/ND-CP).',
        'Digital Technology Industry Law 2025 (No. 71/2025/QH15, effective 01/01/2026).',
      ],
      after: ['When the instruments above are replaced or amended, these Terms are to be read in line with the corresponding new instrument until updated.'],
    },
    {
      heading: '13. Agreement',
      paras: ['By clicking "Agree", you confirm that you have read, understood, and accepted all of the Terms above, and confirm that you meet the conditions in Section 2. If you do not agree, click "Disagree" — the Software will close.'],
    },
  ],
  contact: { facebook: 'https://www.facebook.com/100017717225379', github: 'https://github.com/tuleader/auto-beep-toptop' },
  definitions: [
    ['"Software"', 'Auto Beep TopTop, comprising the application, the bundled Beep Browser, the source code, and accompanying documentation, developed by the Author.'],
    ['"Author"', 'The individual who develops and publishes the Software, reachable through the channel in the Contact section.'],
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
