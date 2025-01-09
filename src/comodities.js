const comodities = {
  default: { key: 'beras-kualitas-bawah', id: 'com_1', name: 'Beras' },
  data: [
    {
      key: 'beras',
      name: 'Beras',
      active: true,
      children: [
        {
          key: 'beras-kualitas-bawah',
          id: 'com_1',
          name: 'Beras Kualitas Bawah',
        },
        {
          key: 'beras-kualitas-medium',
          id: 'com_3',
          name: 'Beras Kualitas Medium',
        },
        {
          key: 'beras-kualitas-super',
          id: 'com_5',
          name: 'Beras Kualitas Super',
        },
      ],
    },

    {
      key: 'minyakgoreng',
      name: 'Minyak Goreng',
      active: false,
      children: [
        {
          key: 'minyak-goreng-curah',
          id: 'com_17',
          name: 'Minyak Goreng Curah',
        },
        {
          key: 'minyak-goreng-kemasan',
          id: 'com_18',
          name: 'Minyak Goreng Kemasan',
        },
      ],
    },
    {
      key: 'telurayam',
      name: 'Telur Ayam',
      active: false,
      children: [
        { key: 'telur-ayam-ras', id: 'com_10', name: 'Telur Ayam Ras' },
      ],
    },
    {
      key: 'gulapasir',
      name: 'Gula Pasir',
      active: false,
      children: [
        {
          key: 'gula-pasir-premium',
          id: 'com_20',
          name: 'Gula Pasir Premium',
        },
        { key: 'gula-pasir-lokal', id: 'com_21', name: 'Gula Pasir Lokal' },
      ],
    },
    {
      key: 'cabairawit',
      name: 'Cabai Rawit',
      active: true,
      children: [
        { key: 'cabai-rawit-hijau', id: 'com_15', name: 'Cabai Rawit Hijau' },
        { key: 'cabai-rawit-merah', id: 'com_16', name: 'Cabai Rawit Merah' },
      ],
    },
    {
      key: 'cabaimerah',
      name: 'Cabai Merah',
      active: false,
      children: [
        { key: 'cabai-merah-besar', id: 'com_13', name: 'Cabai Merah Besar' },
        {
          key: 'cabai-merah-keriting',
          id: 'com_14',
          name: 'Cabai Merah Keriting',
        },
      ],
    },
  ],
}

export default comodities
