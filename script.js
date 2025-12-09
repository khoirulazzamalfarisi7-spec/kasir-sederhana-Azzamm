let keranjang = [];

// Tambah Barang
document.getElementById("tambahBtn").addEventListener("click", function() {
  const nama = document.getElementById("namaBarang").value;
  const harga = parseInt(document.getElementById("hargaBarang").value);
  const jumlah = parseInt(document.getElementById("jumlahBarang").value);

  if (!nama || !harga || !jumlah) {
    alert("Mohon isi semua data barang!");
    return;
  }

  keranjang.push({
    nama,
    harga,
    jumlah,
    total: harga * jumlah
  });

  tampilkanTabel();
  hitungTotal();
});

// Reset Daftar
document.getElementById("resetBtn").addEventListener("click", function() {
  keranjang = [];
  tampilkanTabel();
  hitungTotal();
});

// Tampilkan Tabel
function tampilkanTabel() {
  const tbody = document.getElementById("tabelBody");
  tbody.innerHTML = "";
  keranjang.forEach((item, index) => {
    const row = `
      <tr>
        <td>${item.nama}</td>
        <td>${item.harga}</td>
        <td>${item.jumlah}</td>
        <td>${item.total}</td>
        <td><button class="delete-btn" onclick="hapusItem(${index})">Hapus</button></td>
      </tr>
    `;
    tbody.innerHTML += row;
  });
}

// Hapus item
function hapusItem(index) {
  keranjang.splice(index, 1);
  tampilkanTabel();
  hitungTotal();
}

// Hitung Total Belanja
function hitungTotal() {
  let subtotal = 0;
  keranjang.forEach(item => {
    subtotal += item.total;
  });

  const diskonPersen = parseInt(document.getElementById("diskon").value) || 0;
  const diskon = subtotal * (diskonPersen / 100);
  const pajak = (subtotal - diskon) * 0.11;
  const totalAkhir = subtotal - diskon + pajak;

  document.getElementById("subtotal").innerText = subtotal;
  document.getElementById("pajak").innerText = pajak.toFixed(2);
  document.getElementById("totalAkhir").innerText = totalAkhir.toFixed(2);
}

// Cetak Struk
document.getElementById("cetakBtn").addEventListener("click", function() {
  window.print();
});