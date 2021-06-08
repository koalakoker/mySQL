export let links = [
  {
    "id": 1,
    "href": "http://best.st.com/OurBusiness/MarketSales/SRA/Pages/Home.aspx",
    "name": "SRA",
    "level": 1
  },
  {
    "id": 2,
    "href": "http://pow.ctn.st.com/CLAB/pow_entry.asp",
    "name": "POW",
    "level": 2
  },
  {
    "id": 3,
    "href": "http://ctnapp.st.com/clab/package_upload/",
    "name": "Industrialization package",
    "level": 2
  },
  {
    "id": 4,
    "href": "http://syncdms.st.com/mydms_syslab/out/out.Login.php",
    "name": "MyDMS",
    "level": 2
  },
  {
    "id": 5,
    "href": "http://tlms.st.com/sites/tlms/SitePages/Home.aspx",
    "name": "TLMS",
    "level": 2
  },
  {
    "id": 6,
    "href": "https://peopleservices.st.com/ ",
    "name": "Giustificativi",
    "level": 1
  },
  {
    "id": 7,
    "href": "https://www.zxplink.it.adp.com",
    "name": "Busta paga",
    "level": 1
  },
  {
    "id": 8,
    "href": "http://best.st.com/",
    "name": "BeST",
    "level": 1
  },
  {
    "id": 9,
    "href": "https://webapp.st.com/JD/index.php",
    "name": "JD",
    "level": 1
  },
  {
    "id": 10,
    "href": "https://ehr.st.com/",
    "name": "People First",
    "level": 2
  },
  {
    "id": 11,
    "href": "https://edirectory.st.com/index.php",
    "name": "E-Directory",
    "level": 2
  },
  {
    "id": 12,
    "href": "https://medialib.st.com",
    "name": "Digital Assets Library",
    "level": 2
  },
  {
    "id": 13,
    "href": "",
    "name": "Travel",
    "level": 1
  },
  {
    "id": 14,
    "href": "http://te.st.com/",
    "name": "Travel &amp; Expenses",
    "level": 2
  },
  {
    "id": 15,
    "href": "LOP_Viaggi.pdf",
    "name": "Lop",
    "level": 2
  },
  {
    "id": 16,
    "href": "http://best.st.com/Locations/Italy/Catania/Pages/Home.aspx",
    "name": "Catania Site",
    "level": 1
  },
  {
    "id": 17,
    "href": "http://best.st.com/Locations/Italy/Catania/Pages/banca-e-assicurazione.aspx",
    "name": "Assicurazione",
    "level": 2
  },
  {
    "id": 18,
    "href": "https://mense.allfoodspa.com/webapp/login",
    "name": "Launch box",
    "level": 2
  },
  {
    "id": 19,
    "href": "https://codex.cro.st.com/account/login.php?return_to=%2Fmy%2F",
    "name": "Codex",
    "level": 1
  },
  {
    "id": 20,
    "href": "https://codex.cro.st.com/projects/Drives/",
    "name": "Drives Development (ind. and auto.)",
    "level": 2
  },
  {
    "id": 21,
    "href": "https://codex.cro.st.com/projects/stworkbench",
    "name": "Workbench - Motor Profiler",
    "level": 2
  },
  {
    "id": 22,
    "href": "https://codex.cro.st.com/plugins/tracker/?group_id=6449",
    "name": "Tools Manufacturing Requests",
    "level": 2
  },
  {
    "id": 23,
    "href": "",
    "name": "Setup",
    "level": 1
  },
  {
    "id": 24,
    "href": "https://codex.cro.st.com/file/showfiles.php?group_id=5289",
    "name": "SDK setup Area",
    "level": 2
  },
  {
    "id": 25,
    "href": "",
    "name": "Share points",
    "level": 1
  },
  {
    "id": 26,
    "href": "http://best-collab.st.com/ws/MCDMotorControl/SitePages/Home.aspx",
    "name": "MCD Motor Control development",
    "level": 2
  },
  {
    "id": 27,
    "href": "https://intbugzilla.st.com/",
    "name": "Bugzilla",
    "level": 1
  }
];

let _newId = 28;

export function newId(): number {
  return _newId
}

export function setNewId(newId: number): void {
  _newId = newId;
}