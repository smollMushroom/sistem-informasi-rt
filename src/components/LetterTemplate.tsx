import React from 'react';
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  Font,
} from '@react-pdf/renderer';
import logo from '@/assets/logo';
import { LetterStatus } from '@/types/letterRequest';

Font.registerHyphenationCallback((word) => [word]);

const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingHorizontal: 72,
    paddingBottom: 72,
    fontSize: 12,
    lineHeight: 1.5,
    fontFamily: 'Times-Roman',
  },
  header: {
    textAlign: 'center',
    marginBottom: 1,
    fontSize: 18,
    fontWeight: 'bold',
  },
  header2: {
    textAlign: 'center',
    marginBottom: 0.5,
    fontSize: 14,
  },
  section: {
    marginBottom: 8,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  label: {
    width: '35%',
  },
  value: {
    width: '65%',
  },
  inlineText: {
    fontSize: 12,
    lineHeight: 14, // Pastikan lineHeight sama
    marginRight: 4, // Menambahkan sedikit ruang antar teks
  },
  strikethroughText: {
    textDecoration: 'line-through',
    fontSize: 12,
    lineHeight: 14, // Pastikan lineHeight sama
  },
});

interface Props {
  letterNumber: string;
  fullName: string;
  birthPlace: string;
  birthDate: Date;
  gender: 'female' | 'male';
  reason: string;
  nationalId: string;
  religion: 'Islam' | 'Kristen' | 'Katolik' | 'Hindu' | 'Buddha' | 'Konghucu';
  occupation: string;
  meritalStatus: 'sudah menikah' | 'belum menikah';
  address: string;
  nationality: string;
  submissionDate: Date;
  status: LetterStatus;
  sign: string;
}

interface LetterTemplateProps {
  letter: Props | null;
}

const LetterTemplate: React.FC<LetterTemplateProps> = ({ letter }) => {
  if (!letter) return <>Loading....</>;
  
  const {
    address,
    birthDate,
    birthPlace,
    fullName,
    gender,
    letterNumber,
    meritalStatus,
    nationalId,
    nationality,
    occupation,
    religion,
    reason,
    status,
    sign,
    submissionDate,
  } = letter;

  const splittedLetterNumber = letterNumber.split('-');

  const formatDate = (newDate: string | Date) => {
    const date = new Date(newDate);
    const formattedDate = date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
    return formattedDate;
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={{ borderBottom: 4 }}>
          <Image
            source={{ uri: logo }}
            style={{ width: 65, height: 65, position: 'absolute' }}
          />
          <Text style={styles.header}>RUKUN TETANGGA 06 - RW.04</Text>
          <Text style={styles.header2}>DESA CIMANDALA</Text>
          <Text
            style={{ fontSize: 12, textAlign: 'center', marginBottom: 0.5 }}
          >
            KECAMATAN SUKARAJA - KABUPATEN BOGOR
          </Text>
          <Text style={{ textAlign: 'center', fontSize: 10 }}>
            Kp.Kebon Kelapa – Bogor 16710
          </Text>
        </View>

        <View style={{ marginTop: 12, marginBottom: 12 }}>
          <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>
            SURAT KETERANGAN PENGANTAR
          </Text>
          <Text style={{ textAlign: 'center' }}>
            Nomor : {splittedLetterNumber[0]} / SK-P / {splittedLetterNumber[1]}{' '}
            / {splittedLetterNumber[2]}
          </Text>
        </View>

        <Text style={{ marginBottom: 12, textAlign: 'justify' }}>
          Yang bertanda tangan dibawah ini Ketua RT.06 RW.04 Kampung Pabuaran
          dengan ini menerangkan bahwa :
        </Text>

        <View style={{ ...styles.section, marginLeft: 36 }}>
          <View style={styles.row}>
            <Text style={styles.label}>Nama</Text>
            <Text>: </Text>
            <Text style={styles.value}>{fullName}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Tempat/Tanggal Lahir</Text>
            <Text>: </Text>
            <Text style={styles.value}>
              {birthPlace}, {formatDate(birthDate)}
            </Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={{ width: '35%' }}>Jenis Kelamin</Text>
            <Text style={{ marginLeft: -2.5 }}>: </Text>
            <Text>
              {gender === 'male' ? (
                'Laki-Laki'
              ) : (
                <Text style={{ textDecoration: 'line-through' }}>
                  Laki-Laki
                </Text>
              )}{' '}
              /{' '}
              {gender === 'female' ? (
                'Perempuan'
              ) : (
                <Text style={{ textDecoration: 'line-through' }}>
                  Perempuan
                </Text>
              )}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>NIK</Text>
            <Text>: </Text>
            <Text style={styles.value}>{nationalId}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Agama</Text>
            <Text>: </Text>
            <Text style={styles.value}>{religion}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Pekerjaan</Text>
            <Text>: </Text>
            <Text style={styles.value}>{occupation}</Text>
          </View>
          <View style={{ flexDirection: 'row', marginBottom: 4 }}>
            <Text style={{ width: '35%' }}>Jenis Kelamin</Text>
            <Text style={{ marginLeft: -2.5 }}>: </Text>
            <Text>
              {meritalStatus === 'sudah menikah' ? (
                'Kawin'
              ) : (
                <Text style={{ textDecoration: 'line-through' }}>Kawin</Text>
              )}{' '}
              /{' '}
              {meritalStatus === 'belum menikah' ? (
                'Belum Kawin'
              ) : (
                <Text style={{ textDecoration: 'line-through' }}>
                  Belum Kawin
                </Text>
              )}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Kewarganegaraan</Text>
            <Text>: </Text>
            <Text style={styles.value}>{nationality}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Alamat</Text>
            <Text>: </Text>
            <Text style={styles.value}>{address}</Text>
          </View>
        </View>

        <View style={{ ...styles.section, marginLeft: 36 }}>
          <View style={styles.row}>
            <Text
              style={{
                ...styles.label,
                fontStyle: 'italic',
                fontWeight: 'bold',
              }}
            >
              Keperluan
            </Text>
            <Text>: </Text>
            <Text style={{ ...styles.value, textAlign: 'justify' }}>
              {reason
                ? reason
                : 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Numqua aspernatur beatae non dignissimos harum animi nemo a omnis ullam culpa'}
            </Text>
          </View>
        </View>

        <Text style={{ textAlign: 'justify' }}>
          Nama tersebut diatas adalah benar Warga / berdomisili di Kp.Kebon
          Kelapa, RT.06 RW.04 Ds.Cimandala, Kec.Sukaraja - Kab.Bogor.
        </Text>

        <Text style={{ marginTop: 10 }}>
          Demikian Surat ini dibuat agar dapat dipergunakan Sebagaimana mestinya
          dan penuh tanggung jawab.
        </Text>
        <View style={{ alignItems: 'flex-end', marginTop: 20 }}>
          <View style={{ alignItems: 'center' }}>
            <Text>Kp.Kebon Kelapa, {formatDate(submissionDate)}</Text>
            <Text>Ketua RT.06 - RW.04</Text>
            {status === 'approved' && sign && (
              <Image src={{ uri: sign }} style={{ width: 100, height: 100 }} />
            )}
            <Text
              style={{
                textAlign: 'center',
                marginTop: !sign ? 40 : 0, // Tambahkan margin top jika sign tidak ada
              }}
            >
              ( Deni S )
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default LetterTemplate;
