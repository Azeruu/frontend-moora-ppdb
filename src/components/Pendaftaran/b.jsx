const FuzzyAndKeterangan = async (namaKriteria, nilaiReal) => {
          try {
              const kriteriumId = dataKriteriumId[namaKriteria];
              const response = await axios.get(`/subkriteria?kriteriumId=${kriteriumId}`);
              const subKriteriaList = response.data;
      
              let nilai_fuzzy = 0;
              let keterangan = "";
      
      
              // Temukan subkriteria yang sesuai dengan nilai real
              for (const subKriteria of subKriteriaList) {
                  const [minRange, maxRange] = subKriteria.sub_kriteria.split('-').map(Number);
      
                  console.log(minRange)
                  console.log(maxRange)
                  if (nilaiReal >= minRange && nilaiReal <= maxRange) {
                  nilai_fuzzy = subKriteria.bobot;
                  keterangan = subKriteria.keterangan;
                  break; // Keluar dari loop jika sudah menemukan kecocokan
                  }
              }
      
              // Jika tidak ada kecocokan, mungkin nilai real di luar jangkauan
              if (!keterangan) {
                  keterangan = "Nilai di luar jangkauan";
              }
      
              return { nilai_fuzzy, keterangan };
          } catch (error) {
              console.error("Error fetching sub-kriteria:", error);
              return { nilai_fuzzy: 0, keterangan: "Error" };
          }
      };