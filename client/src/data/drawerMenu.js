import {Trans} from "react-i18next";

export const homeMenu = [
  
  {
    text: <Trans i18nKey="Beranda">Beranda</Trans>,
    linkUrl: '/home',
    asUrl: '/home',
  }
]

export const aboutMenu = [
  
  {
    text: <Trans i18nKey="Profilku">Profil</Trans>,
    linkUrl: '/profile',
    asUrl: '/profile',
    // subMenu: [
    //   {
    //     text: 'Vision & Charisms',
    //     linkUrl: '/about/vision-charisms',
    //     asUrl: '/page?type=aboutPages&id=vision-charisms'
    //   },
    //   {
    //     text: 'Strategic Planning',
    //     linkUrl: '/strategic-planning',
    //     asUrl: '/page?type=aboutPages&id=strategic-planning'
    //   }
    // ]
  },
  {
    text: <Trans i18nKey="Selayang">Selayang Pandang</Trans>,
    linkUrl: '/selayang_pandang',
    asUrl: '/selayang_pandang',
    // subMenu: [
    //   {
    //     text: 'Franciscans TOR',
    //     linkUrl: '/chapel/franciscans-tor',
    //     asUrl: '/page?type=chapelPages&id=franciscans-tor'
    //   }
    // ]
  },
  {
    text: <Trans i18nKey="VisiMisi">Visi & Misi</Trans>,
    linkUrl: '/visi_misi',
    asUrl: '/visi_misi',
    // subMenu: [
    //   {
    //     text: 'Careers',
    //     linkUrl: '/careers',
    //     asUrl: '/job-list?type=jobs&id=careers'
    //   },
    //   {
    //     text: 'Integrity & Truth',
    //     linkUrl: 'https://integrityandtruth.franciscan.edu/'
    //   }
    // ]
  },
  {
    text: <Trans i18nKey="Organisasi">Struktur Organisasi</Trans>,
    linkUrl: '/struktur_organisasi',
    asUrl: '/struktur_organisasi',
    // subMenu: [
    //   {
    //     text: 'Fact Book',
    //     linkUrl: '/fact-book',
    //     asUrl: '/page?type=aboutPages&id=fact-book'
    //   }
    // ]
  }
  // ,
  // {
  //   text: 'Support Franciscan',
  //   linkUrl: 'http://giving.franciscan.edu/'
  // },
  // {
  //   text: 'News',
  //   linkUrl: '/news',
  //   asUrl: '/news-list?type=news&id=news'
  // },
  // {
  //   text: 'Events',
  //   linkUrl: '/events',
  //   asUrl: '/event-list?type=events&id=events'
  // }
]

export const academicsMenu = [
  {
    text: <Trans i18nKey="Kalender">Kalender Akademik</Trans>,
    linkUrl: '/kalender_akademik',
    asUrl: '/kalender_akademik',
    // subMenu: [
    //   {
    //     text: 'Kalender Akademik',
    //     linkUrl: '/academics/ug/kalender-akademik',
    //     asUrl: '/page?type=academicsPages&id=kalender-akademik'
    //   }
      // ,
      // {
      //   text: 'Core Curriculum',
      //   linkUrl: '/core-curriculum',
      //   asUrl: '/page?type=academicsPages&id=core-curriculum'
      // },
      // {
      //   text: 'Academic Clubs',
      //   linkUrl:
      //     'http://franciscan.smartcatalogiq.com/en/2016-2017/Undergraduate-Catalog/Academic-Organizations'
      // },
      // {
      //   text: 'Undergraduate Catalog',
      //   linkUrl:
      //     'http://franciscan.smartcatalogiq.com/current/Undergraduate-Catalog',
      //   asUrl:
      //     'http://franciscan.smartcatalogiq.com/current/Undergraduate-Catalog'
      // }
    //]
  }
  // ,
  // {
  //   text: 'Graduate',
  //   linkUrl: '/academics/graduate',
  //   asUrl: '/page?type=academicsPages&id=graduate',
  //   subMenu: [
  //     {
  //       text: 'Programs',
  //       linkUrl: '/academics/graduate',
  //       asUrl: '/page?type=academicsPages&id=graduate'
  //     },
  //     {
  //       text: 'Graduate Catalog',
  //       linkUrl:
  //         'http://franciscan.smartcatalogiq.com/current/Graduate-Catalog',
  //       asUrl: 'http://franciscan.smartcatalogiq.com/current/Graduate-Catalog'
  //     }
  //   ]
  // },
  // {
  //   text: 'Online',
  //   linkUrl: '/admissions/online',
  //   asUrl: '/page?type=admissionsPages&id=online',
  //   subMenu: [
  //     {
  //       text: 'Programs',
  //       linkUrl: '/admissions/online',
  //       asUrl: '/page?type=admissionsPages&id=online'
  //     },
  //     {
  //       text: 'Catalogs',
  //       linkUrl: 'http://franciscan.smartcatalogiq.com/'
  //     }
  //   ]
  // },
  // {
  //   text: 'Academic Affairs',
  //   subMenu: [
  //     {
  //       text: 'Academic Support',
  //       linkUrl: '/sass',
  //       asUrl: '/page?type=sassPages&id=sass'
  //     },
  //     {
  //       text: 'Advising',
  //       linkUrl: '/academic-advising',
  //       asUrl: '/page?type=academicsPages&id=academic-advising'
  //     },
  //     {
  //       text: 'Registrar',
  //       linkUrl: '/registrar',
  //       asUrl: '/page?type=sfsPages&id=registrar'
  //     },
  //     {
  //       text: 'St. John Paul II Library',
  //       linkUrl:
  //         'http://libguides.franciscan.edu/friendly.php?action=82&s=Welcome_to_the_JPII_Library'
  //     }
  //   ]
  // },
  // {
  //   text: 'Departments',
  //   linkUrl: '/departments',
  //   asUrl: '/page?type=departments&id=departments',
  //   subMenu: [
  //     {
  //       text: 'Institutes & Centers',
  //       linkUrl: '/institutes-centers',
  //       asUrl: '/page?type=institutes&id=institutes-centers'
  //     },
  //     {
  //       text: 'Franciscan University Press',
  //       linkUrl: '/fupress',
  //       asUrl: '/page?type=pressPages&id=fupress'
  //     }
  //   ]
  // },
  // {
  //   text: 'Austrian Semester',
  //   linkUrl: '/austria',
  //   asUrl: '/page?type=austriaPages&id=austria'
  // }
]

export const admissionsMenu = [
  {
    text: <Trans i18nKey="TRO">D-IV Teknologi Rekayasa Otomotif</Trans>,
    linkUrl: '/otomotif',
    asUrl: '/otomotif',
    // subMenu: [
    //   {
    //     text: 'General Requirements',
    //     linkUrl: '/admissions/undergraduate/requirements/',
    //     asUrl: '/page?type=admissionsPages&id=requirements'
    //   },
    //   {
    //     text: 'Transfer Students',
    //     linkUrl: '/admissions/undergraduate/transfer-requirements/',
    //     asUrl: '/page?type=admissionsPages&id=transfer-requirements'
    //   },
    //   {
    //     text: 'Local High School',
    //     linkUrl: '/savings-for-local-graduates',
    //     asUrl: '/page?type=admissionsPages&id=savings-for-local-graduates'
    //   },
    //   {
    //     text: 'Homeschool',
    //     linkUrl: '/admissions/undergraduate/requirements/',
    //     asUrl: '/page?type=admissionsPages&id=requirements'
    //   },
    //   {
    //     text: 'International',
    //     linkUrl: '/admissions/undergraduate-international/',
    //     asUrl: '/page?type=admissionsPages&id=undergraduate-international'
    //   },
    //   {
    //     text: 'Costs and Fees',
    //     linkUrl: '/sfs/new/costs-and-fees',
    //     asUrl: '/page?type=sfsPages&id=costs-and-fees'
    //   },
    //   {
    //     text: 'Financial Aid',
    //     linkUrl: '/sfs/new/',
    //     asUrl: '/page?type=sfsPages&id=new'
    //   }
    // ]
  },
  {
    text: <Trans i18nKey="Sipil">D-III Teknologi Sipil</Trans>,
    linkUrl: '/teknologi_sipil',
    asUrl: '/teknologi_sipil',
    // These submenu items have the wrong urls
    // subMenu: [
    //   {
    //     text: 'Meet the Staff',
    //     linkUrl: '/admissions/graduate-admissions-staff',
    //     asUrl: '/page?type=admissionsPages&id=graduate-admissions-staff'
    //   },
    //   {
    //     text: 'Requirements',
    //     linkUrl: '/admissions/graduate-requirements',
    //     asUrl: '/page?type=admissionsPages&id=graduate-requirements'
    //   },
    //   {
    //     text: 'Costs',
    //     linkUrl: '/admissions/graduate-costs',
    //     asUrl: '/page?type=admissionsPages&id=graduate-costs'
    //   }
    // ]
  },
  {
    text: <Trans i18nKey="Akuntansi">D-III Akuntansi</Trans>,
    linkUrl: '/akuntansi',
    asUrl: '/akuntansi',
  },
  {
    text: <Trans i18nKey="TI">D-III Teknologi Informasi</Trans>,
    linkUrl: '/teknologi_informasi',
    asUrl: '/teknologi_informasi',
  }
  // ,
  // {
  //   text: 'Request Information',
  //   linkUrl: 'https://franciscan.secure.force.com/form?formid=217772'
  // },
  // {
  //   text: 'Visit Campus',
  //   linkUrl: 'https://franciscan.secure.force.com/events'
  // }
]

export const faithMenu = [
  {
    text: <Trans i18nKey="SNBP">Seleksi Nasional Berdasarkan Prestasi – SNBP</Trans>,
    linkUrl: '/snbp',
    asUrl: '/snbp'
  },
  {
    text: <Trans i18nKey="SNBT">Seleksi Nasional Berdasarkan Tes – SNBT</Trans>,
    linkUrl: '/snbt',
    asUrl: '/snbt'

    // subMenu: [
    //   {
    //     text: 'Festivals of Praise',
    //     linkUrl: 'http://photos.pass.us/fop/'
    //   }
    // ]
  },
  {
    text: <Trans i18nKey="Mandiri">Jalur Mandiri</Trans>,
    linkUrl: '/mandiri',
    asUrl: '/mandiri'

    // subMenu: [
    //   {
    //     text: 'Festivals of Praise',
    //     linkUrl: 'http://photos.pass.us/fop/'
    //   }
    // ]
  },
  // {
  //   text: 'Summer Conferences',
  //   linkUrl: 'https://steubenvilleconferences.com/',
  //   subMenu: [
  //     {
  //       text: 'Youth Conferences',
  //       linkUrl: 'https://steubenvilleconferences.com/youth/'
  //     },
  //     {
  //       text: 'Adult Conferences',
  //       linkUrl: 'https://steubenvilleconferences.com/adult/'
  //     }
  //   ]
  // },
  // {
  //   text: 'Faith & Reason',
  //   linkUrl: 'https://www.faithandreason.com/'
  // },
  // {
  //   text: 'Off-Campus Evangelization',
  //   linkUrl: '/evangelization/',
  //   asUrl: '/page?type=studentLifePages&id=evangelization',
  //   subMenu: [
  //     {
  //       text: 'Missionary Outreach',
  //       linkUrl: '/missionary-outreach/',
  //       asUrl: '/page?type=missionsPages&id=missionary-outreach'
  //     },
  //     {
  //       text: 'Pilgrimages',
  //       linkUrl: '/pilgrimages/',
  //       asUrl: '/page?type=pilgrimagesPages&id=pilgrimages'
  //     },
  //     {
  //       text: 'Franciscan Magazine',
  //       linkUrl: '/franciscanmagazine/',
  //       asUrl: '/page?type=pressPages&id=franciscanmagazine'
  //     },
  //     {
  //       text: 'Franciscan University Presents',
  //       linkUrl: 'http://www.faithandreason.com/franciscan-university-presents/'
  //     }
  //   ]
  // }
]

export const studentMenu = [
  {
    text: <Trans i18nKey="Kegiatan">Kegiatan Mahasiswa</Trans>,
    linkUrl: '/kegiatan_mahasiswa',
    asUrl: '/kegiatan_mahasiswa',
    // subMenu: [
  //     {
  //       text: 'Residence Halls',
  //       linkUrl: '/residence-life/halls',
  //       asUrl: '/page?type=studentLifePages&id=halls'
  //     }
    // ]
  },
  {
    text: <Trans i18nKey="Pengumuman">Pengumuman</Trans>,
    linkUrl: '/pengumuman',
    asUrl: '/pengumuman'
  },
  // {
  //   text: 'Baron Athletics',
  //   linkUrl: 'http://www.franciscanathletics.com/'
  // },
  // {
  //   text: 'Austrian Semester',
  //   linkUrl: '/austria',
  //   asUrl: '/page?type=austriaPages&id=austria'
  // },
  // {
  //   text: 'Campus Activities',
  //   subMenu: [
  //     {
  //       text: 'Excite',
  //       linkUrl: '/excite',
  //       asUrl: '/page?type=studentLifePages&id=excite'
  //     },
  //     {
  //       text: 'Franciscan Homecoming',
  //       linkUrl: '/homecoming',
  //       asUrl: '/page?type=studentLifePages&id=homecoming'
  //     },
  //     {
  //       text: 'Orientation',
  //       linkUrl: '/orientation',
  //       asUrl: '/page?type=studentLifePages&id=orientation'
  //     },
  //     {
  //       text: 'Student Clubs',
  //       linkUrl: '/student-clubs',
  //       asUrl: '/page?type=studentLifePages&id=student-clubs'
  //     }
  //   ]
  // },
  // {
  //   text: 'Campus Services',
  //   subMenu: [
  //     {
  //       text: 'Dining Services',
  //       linkUrl: 'https://franciscan.catertrax.com/'
  //     },
  //     {
  //       text: 'Wellness Center',
  //       linkUrl: '/wellness-center-staff',
  //       asUrl: '/page?type=studentLifePages&id=wellness-center-staff'
  //     },
  //     {
  //       text: 'ITS',
  //       linkUrl: '/information-technology',
  //       asUrl: '/page?type=itsPages&id=information-technology'
  //     },
  //     {
  //       text: 'SWOP',
  //       linkUrl: '/swop',
  //       asUrl: '/page?type=sfsPages&id=swop'
  //     },
  //     {
  //       text: 'Career Services',
  //       linkUrl: '/career-services',
  //       asUrl: '/page?type=studentLifePages&id=career-services'
  //     },
  //     {
  //       text: 'Disability Services',
  //       linkUrl: '/sass/disability',
  //       asUrl: '/page?type=sassPages&id=disability'
  //     },
  //     {
  //       text: 'Campus Security',
  //       linkUrl: '/campus-security',
  //       asUrl: '/page?type=campusSecurity&id=campus-security'
  //     }
  //   ]
  // },
  // {
  //   text: 'Student Handbook',
  //   linkUrl: 'https://en.calameo.com/read/0000568540ebff6129cec'
  // },
  // {
  //   text: 'FranciscanU App',
  //   subMenu: [
  //     {
  //       text: 'Android',
  //       linkUrl:
  //         'https://play.google.com/store/apps/details?id=edu.franciscan.student&hl=en_US'
  //     },
  //     {
  //       text: 'iOS',
  //       linkUrl:
  //         'https://itunes.apple.com/us/app/the-franciscanu-app/id1326217652?mt=8'
  //     }
  //   ]
  // }
]
export const campusMenu = [
  {
    text: <Trans i18nKey="Profil Kabupaten">Profil Lumajang</Trans>,
    linkUrl: '/profil_lumajang',
    asUrl: '/profil_lumajang',
  },
  {
    text: <Trans i18nKey="Budaya">Budaya Lumajang</Trans>,
    linkUrl: '/budaya_lumajang',
    asUrl: '/budaya_lumajang',
  },
  {
    text: <Trans i18nKey="Pariwisata">Pariwisata Lumajang</Trans>,
    linkUrl: '/pariwisata_lumajang',
    asUrl: '/pariwisata_lumajang',
  },
  {
    text: <Trans i18nKey="Kuliner">Kuliner Lumajang</Trans>,
    linkUrl: '/kuliner_lumajang',
    asUrl: '/kuliner_lumajang',
  },
  {
    text: <Trans i18nKey="Transportasi">Transportasi Lumajang</Trans>,
    linkUrl: '/transportasi_lumajang',
    asUrl: '/transportasi_lumajang'
  },
]
export const psdkuMenu = [
  {
    text: <Trans i18nKey="Perpustakaan">Perpustakaan</Trans>,
    linkUrl: '/perpustakaan_polinema',
    asUrl: '/perpustakaan_polinema',
  },
  // {
  //   text: <Trans i18nKey="Fasilitas-Bangunan">Fasilitas Bangunan</Trans>,
  //   linkUrl: '/fasilitas_bangunan',
  //   asUrl: '/fasilitas_bangunan',
  // },
  {
    text: <Trans i18nKey="Parkir">Fasilitas Parkir</Trans>,
    linkUrl: '/fasilitas_parkir',
    asUrl: '/fasilitas_parkir',
  },
  {
    text: <Trans i18nKey="Kantin">Kantin</Trans>,
    linkUrl: '/kantin',
    asUrl: '/kantin',
  },
  {
    text: <Trans i18nKey="Keamanan">Keamanan</Trans>,
    linkUrl: '/keamanan',
    asUrl: '/keamanan',
  },
  // {
  //   text: <Trans i18nKey="Budaya">Fasilitas Bangunan</Trans>,
  //   linkUrl: '/budaya_lumajang',
  //   asUrl: '/budaya_lumajang',
  // },
  // {
  //   text: <Trans i18nKey="pariwisata">Kantin</Trans>,
  //   linkUrl: '/pariwisata_lumajang',
  //   asUrl: '/pariwisata_lumajang',
  // },
  // {
  //   text: <Trans i18nKey="kuliner">Keamanan</Trans>,
  //   linkUrl: '/kuliner_lumajang',
  //   asUrl: '/kuliner_lumajang',
  // },
  // {
  //   text: <Trans i18nKey="transportasi">Fasilitas Parkir</Trans>,
  //   linkUrl: '/transportasi_lumajang',
  //   asUrl: '/transportasi_lumajang'
  // },
]
