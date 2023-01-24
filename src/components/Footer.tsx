const items = [{ path: 'https://instagram.com/sole_luxury_?igshid=NTdlMDg3MTY=', name: 'INSTAGRAM' }, { path: '/contact', name: 'CONTACT' }, { path: '/whatsapp', name: 'WHATSAPP' }];

const Footer = () => {
  return (
    <div className='text-center p-3 mt-5 pb-20 md:text-right'>
      <p className='font-mono text-sm animate-pulse'>&copy;SOLE LUXURY 2023. ALL RIGHTS RESERVED.</p>
      {items.map((item) => (
        <a className='font-mono text-sm' href={item.path} key={item.path}>
          {item.name} |&nbsp;
        </a>
      ))}
      <p className='font-mono text-sm mt-4'>SOLE LUXURY INC, TRANSAERODROME UMUCHIGBO IJI-NIKE EMENE ENUGU STATE, NIGERIA. PH +2349078146674 CUSTOMERCARE@SOLE-LUXURY.NG</p>
    </div>
  )
}

export default Footer;
