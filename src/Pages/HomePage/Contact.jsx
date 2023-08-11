import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact" id="contact">
      <h2>
        <span>Kontak</span> Kami
      </h2>
      <p>Jika ada pertanyaan aau keluhan mengenai website bisa hubungi kami di kontak pesan dibawah atau untuk lebih jelasnya bisa hubungi kami di sosial media kami di bagian bawah website ini</p>
      <div className="row">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3965.994222610335!2d106.42737564665815!3d-6.264488897983283!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e42042fd26b0c7f%3A0xd1f9ecddb84d077!2sSMP%20Negeri%201%20Cisoka!5e0!3m2!1sid!2sid!4v1674961393075!5m2!1sid!2sid"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade" className="map"
            title="map-title"
          ></iframe>
        <form>
          <div className="input-group">
            <i data-feather="user"></i>
            <input type="text" placeholder="Masukan Nama Kamu" />
          </div>
          <div className="input-group">
            <input type="email" placeholder="Masukan Email Kamu" />
          </div>
          <div className="input-group">
            <input type="text" placeholder="Masukan Nomor Hp Kamu" />
          </div>
          <button type="submit" className="btn-contact">
            Kirim Pesan
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
