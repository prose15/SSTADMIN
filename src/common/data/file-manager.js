const myfiles = [
  {
    id: 1,
    name: "Design",
    file: "12",
    Gb: 6,
  },
  {
    id: 2,
    name: "Development",
    file: "20",
    Gb: 8,
  },
  {
    id: 3,
    name: "Project A",
    file: "06 ",
    Gb: 2,
  },
  {
    id: 4,
    name: "Admin",
    file: "08",
    Gb: 4,
  },
  {
    id: 5,
    name: "Sketch Design",
    file: "12",
    Gb: 6,
  },
  {
    id: 6,
    name: "Applications",
    file: "20",
    Gb: 8,
  },
];

const recentfile = [
  {
    id: 1,
    icon: "mdi mdi-ticket-confirmation-outline font-size-16 align-middle text-primary me-2",
    file: "SST001",
    date: "12-10-2020, 09:45",
    size: "125/200",
  },
  {
    id: 1,
    icon: "mdi mdi-ticket-confirmation-outline font-size-16 align-middle text-primary me-2",
    file: "SST001",
    date: "12-10-2020, 09:45",
    size: "125/200",
  },
  {
    id: 1,
    icon: "mdi mdi-ticket-confirmation-outline font-size-16 align-middle text-primary me-2",
    file: "SST001",
    date: "12-10-2020, 09:45",
    size: "125/200",
  },
  {
    id: 1,
    icon: "mdi mdi-ticket-confirmation-outline font-size-16 align-middle text-primary me-2",
    file: "SST001",
    date: "12-10-2020, 09:45",
    size: "125/200",
  },
  {
    id: 1,
    icon: "mdi mdi-ticket-confirmation-outline font-size-16 align-middle text-primary me-2",
    file: "SST001",
    date: "12-10-2020, 09:45",
    size: "125/200",
  },
  {
    id: 1,
    icon: "mdi mdi-ticket-confirmation-outline font-size-16 align-middle text-primary me-2",
    file: "SST001",
    date: "12-10-2020, 09:45",
    size: "125/200",
  },
];

const filesData = [
  {
    text: "Design",
    icon: false
  },
  {
    text: "Development",
    icon: true
  },
  {
    text: "Project A",
    icon: false
  },
  {
    text: "Admin",
    icon: true
  }
];

const filemanagerData = [
  {
    icon: "mdi mdi-google-drive font-size-16 text-muted me-2",
    text: "Google Drive",
  },
  {
    icon: "mdi mdi-dropbox font-size-16 me-2 text-primary",
    text: "Dropbox",
  },
  {
    icon: "mdi mdi-share-variant font-size-16 me-2",
    text: "Shared",
    icons: true
  },
  {
    icon: "mdi mdi-star-outline text-muted font-size-16 me-2",
    text: "Starred",
  },
  {
    icon: "mdi mdi-trash-can text-danger font-size-16 me-2",
    text: "Trash",
  },
  {
    icon: "mdi mdi-cog text-muted font-size-16 me-2",
    text: "Setting",
    badge: true
  }
]

const storageData = [
  {
    id: 1,
    title: "Images",
    color: "success",
    icon: "mdi mdi-image",
    files: "176 Files",
    size: "6 GB"
  },
  {
    id: 2,
    title: "Video",
    color: "danger",
    icon: "mdi mdi-play-circle-outline",
    files: "45 Files",
    size: "4.1 GB"
  },
  {
    id: 3,
    title: "Music",
    color: "info",
    icon: "mdi mdi-music",
    files: "21 Files",
    size: "3.2 GB"
  },
  {
    id: 4,
    title: "Document",
    color: "primary",
    icon: "mdi mdi-file-document",
    files: "21 Files",
    size: "2 GB"
  },
  {
    id: 5,
    title: "Others",
    color: "warning",
    icon: "mdi mdi-folder",
    files: "20 Files",
    size: "1.4 GB"
  }
]


export { myfiles, recentfile, filesData, filemanagerData, storageData };