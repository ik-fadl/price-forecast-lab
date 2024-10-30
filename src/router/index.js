import {
  createRouter,
  createWebHistory,
  createWebHashHistory,
} from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  // history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'init',
      redirect: 'dashboard',
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashboardView.vue'),
    },
    {
      path: '/master',
      name: 'master',
      redirect: '/master/cabai-rawit-hijau',
      component: () => import('../views/master/IndexMaster.vue'),
      children: [
        {
          path: 'cabai-rawit-hijau',
          name: 'cabai-rawit-hijau',
          component: () => import('../views/master/CabaiRawitHijau.vue'),
        },
        {
          path: 'cabai-rawit-merah',
          name: 'cabai-rawit-merah',
          component: () => import('../views/master/CabaiRawitMerah.vue'),
        },
        {
          path: 'cabai-merah-besar',
          name: 'cabai-merah-besar',
          component: () => import('../views/master/CabaiMerahBesar.vue'),
        },
        {
          path: 'cabai-merah-keriting',
          name: 'cabai-merah-keriting',
          component: () => import('../views/master/CabaiMerahKeriting.vue'),
        },
        {
          path: 'minyak-goreng-curah',
          name: 'minyak-goreng-curah',
          component: () => import('../views/master/MinyakGorengCurah.vue'),
        },
        {
          path: 'minyak-goreng-kemasan',
          name: 'minyak-goreng-kemasan',
          component: () => import('../views/master/MinyakGorengKemasan.vue'),
        },
        {
          path: 'telur-ayam-ras',
          name: 'telur-ayam-ras',
          component: () => import('../views/master/TelurAyamRas.vue'),
        },
        {
          path: 'gula-pasir-lokal',
          name: 'gula-pasir-lokal',
          component: () => import('../views/master/GulaPasirLokal.vue'),
        },
        {
          path: 'gula-pasir-premium',
          name: 'gula-pasir-premium',
          component: () => import('../views/master/GulaPasirPremium.vue'),
        },
      ],
    },
    {
      path: '/forecast',
      name: 'forecast',
      redirect: '/forecast/cabai-rawit-hijau',
      component: () => import('../views/forecast/IndexForecast.vue'),
      children: [
        {
          path: 'cabai-rawit-hijau',
          name: 'prediksi-harga-cabai-rawit-hijau',
          component: () => import('../views/forecast/CabaiRawitHijau.vue'),
        },
        {
          path: 'cabai-rawit-merah',
          name: 'prediksi-harga-cabai-rawit-merah',
          component: () => import('../views/forecast/CabaiRawitMerah.vue'),
        },
        {
          path: 'cabai-merah-besar',
          name: 'prediksi-harga-cabai-merah-besar',
          component: () => import('../views/forecast/CabaiMerahBesar.vue'),
        },
        {
          path: 'cabai-merah-keriting',
          name: 'prediksi-harga-cabai-merah-keriting',
          component: () => import('../views/forecast/CabaiMerahKeriting.vue'),
        },
        {
          path: 'minyak-goreng-curah',
          name: 'prediksi-harga-minyak-goreng-curah',
          component: () => import('../views/forecast/MinyakGorengCurah.vue'),
        },
        {
          path: 'minyak-goreng-kemasan',
          name: 'prediksi-harga-minyak-goreng-kemasan',
          component: () => import('../views/forecast/MinyakGorengKemasan.vue'),
        },
        {
          path: 'telur-ayam-ras',
          name: 'prediksi-harga-telur-ayam-ras',
          component: () => import('../views/forecast/TelurAyamRas.vue'),
        },
        {
          path: 'gula-pasir-lokal',
          name: 'prediksi-harga-gula-pasir-lokal',
          component: () => import('../views/forecast/GulaPasirLokal.vue'),
        },
        {
          path: 'gula-pasir-premium',
          name: 'prediksi-harga-gula-pasir-premium',
          component: () => import('../views/forecast/GulaPasirPremium.vue'),
        },
      ],
    },
    {
      path: '/uji',
      name: 'uji',
      component: () => import('../views/uji/IndexUji.vue'),
      redirect: '/uji/cabai-rawit-hijau',
      children: [
        {
          path: 'cabai-rawit-hijau',
          name: 'uji-harga-cabai-rawit-hijau',
          component: () => import('../views/uji/CabaiRawitHijau.vue'),
        },
        {
          path: 'cabai-rawit-merah',
          name: 'uji-harga-cabai-rawit-merah',
          component: () => import('../views/uji/CabaiRawitMerah.vue'),
        },
        {
          path: 'cabai-merah-besar',
          name: 'uji-harga-cabai-merah-besar',
          component: () => import('../views/uji/CabaiMerahBesar.vue'),
        },
        {
          path: 'cabai-merah-keriting',
          name: 'uji-harga-cabai-merah-keriting',
          component: () => import('../views/uji/CabaiMerahKeriting.vue'),
        },
        {
          path: 'minyak-goreng-curah',
          name: 'uji-harga-minyak-goreng-curah',
          component: () => import('../views/uji/MinyakGorengCurah.vue'),
        },
        {
          path: 'minyak-goreng-kemasan',
          name: 'uji-harga-minyak-goreng-kemasan',
          component: () => import('../views/uji/MinyakGorengKemasan.vue'),
        },
        {
          path: 'telur-ayam-ras',
          name: 'uji-harga-telur-ayam-ras',
          component: () => import('../views/uji/TelurAyamRas.vue'),
        },
        {
          path: 'gula-pasir-lokal',
          name: 'uji-harga-gula-pasir-lokal',
          component: () => import('../views/uji/GulaPasirLokal.vue'),
        },
        {
          path: 'gula-pasir-premium',
          name: 'uji-harga-gula-pasir-premium',
          component: () => import('../views/uji/GulaPasirPremium.vue'),
        },
      ],
    },
  ],
})

export default router
