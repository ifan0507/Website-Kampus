import { Route, Switch } from 'react-router-dom'
import { HomePage, ProfilePage, selayang_pandang, akutansi, visi_misi, struktur_organisasi, Kalender_akademik, otomotif, teknologi_sipil, teknologi_informasi, snbp, snbt, mandiri, kegiatan_mahasiswa, kegiatan_mahasiswa2, kegiatan_mahasiswa3, pengumuman, pengumuman1, pengumuman2, profil_lumajang, kuliner_lumajang, pariwisata_lumajang, transportasi_lumajang, budaya_lumajang, item_kegiatan1, item_kegiatan2, item_kegiatan3, item_pengumuman1, item_pengumuman2, item_pengumuman3 } from './apps/pages'
import perpustakaan_polinema from './apps/pages/perpustakaan_polinema'
import fasilitas_parkir from './apps/pages/fasilitas_parkir'
import keamanan from './apps/pages/keamanan'
import kantin from './apps/pages/kantin'
import item_kegiatan4 from './apps/pages/item_kegiatan4'
import item_kegiatan5 from './apps/pages/item_kegiatan5'
import item_kegiatan6 from './apps/pages/item_kegiatan6'
import item_kegiatan7 from './apps/pages/item_kegiatan7'
import item_kegiatan8 from './apps/pages/item_kegiatan8'
import item_kegiatan9 from './apps/pages/item_kegiatan9'
import item_pengumuman4 from './apps/pages/item_pengumuman4'
import item_pengumuman5 from './apps/pages/item_pengumuman5'
import item_pengumuman6 from './apps/pages/item_pengumuman6'
import item_pengumuman7 from './apps/pages/item_pengumuman7'
import item_pengumuman8 from './apps/pages/item_pengumuman8'
import item_pengumuman9 from './apps/pages/item_pengumuman9'
import galeri from './apps/pages/galeri'
import mapping from './apps/pages/mapping'


const AppRoute = () => {
    return (
        <Switch>
            <Route exact path='/' component={HomePage} />
            <Route exact path='/profile' component={ProfilePage} />
            <Route exact path='/selayang_pandang' component={selayang_pandang} />
            <Route exact path='/visi_misi' component={visi_misi} />
            <Route exact path='/struktur_organisasi' component={struktur_organisasi} />
            <Route exact path='/kalender_akademik' component={Kalender_akademik} />

            <Route exact path='/akuntansi' component={akutansi} />
            <Route exact path='/otomotif' component={otomotif} />
            <Route exact path='/teknologi_sipil' component={teknologi_sipil} />
            <Route exact path='/teknologi_informasi' component={teknologi_informasi} />

            <Route exact path='/snbp' component={snbp} />
            <Route exact path='/snbt' component={snbt} />
            <Route exact path='/mandiri' component={mandiri} />

            <Route exact path='/kegiatan_mahasiswa' component={kegiatan_mahasiswa} />
            <Route exact path='/kegiatan_mahasiswa2' component={kegiatan_mahasiswa2} />
            <Route exact path='/kegiatan_mahasiswa3' component={kegiatan_mahasiswa3} />
            <Route exact path='/item_kegiatan1' component={item_kegiatan1} />
            <Route exact path='/item_kegiatan2' component={item_kegiatan2} />
            <Route exact path='/item_kegiatan3' component={item_kegiatan3} />
            <Route exact path='/item_kegiatan4' component={item_kegiatan4} />
            <Route exact path='/item_kegiatan5' component={item_kegiatan5} />
            <Route exact path='/item_kegiatan6' component={item_kegiatan6} />
            <Route exact path='/item_kegiatan7' component={item_kegiatan7} />
            <Route exact path='/item_kegiatan8' component={item_kegiatan8} />
            <Route exact path='/item_kegiatan9' component={item_kegiatan9} />

            <Route exact path='/pengumuman' component={pengumuman} />
            <Route exact path='/pengumuman1' component={pengumuman1} />
            <Route exact path='/pengumuman2' component={pengumuman2} />
            <Route exact path='/item_pengumuman1' component={item_pengumuman1} />
            <Route exact path='/item_pengumuman2' component={item_pengumuman2} />
            <Route exact path='/item_pengumuman3' component={item_pengumuman3} />
            <Route exact path='/item_pengumuman4' component={item_pengumuman4} />
            <Route exact path='/item_pengumuman5' component={item_pengumuman5} />
            <Route exact path='/item_pengumuman6' component={item_pengumuman6} />
            <Route exact path='/item_pengumuman7' component={item_pengumuman7} />
            <Route exact path='/item_pengumuman8' component={item_pengumuman8} />
            <Route exact path='/item_pengumuman9' component={item_pengumuman9} />

            <Route exact path='/profil_lumajang' component={profil_lumajang} />
            <Route exact path='/budaya_lumajang' component={budaya_lumajang} />
            <Route exact path='/kuliner_lumajang' component={kuliner_lumajang} />
            <Route exact path='/transportasi_lumajang' component={transportasi_lumajang} />
            <Route exact path='/pariwisata_lumajang' component={pariwisata_lumajang} />

            <Route exact path='/perpustakaan_polinema' component={perpustakaan_polinema} />
            {/* <Route exact path='/fasilitas_bangunan' component={fasilitas_bangunan} /> */}
            <Route exact path='/fasilitas_parkir' component={fasilitas_parkir} />
            <Route exact path='/kantin' component={kantin} />
            <Route exact path='/keamanan' component={keamanan} />
            <Route exact path='/galeri' component={galeri} />
            <Route exact path='/mapping' component={mapping} />

        </Switch>
    )
}

export default AppRoute