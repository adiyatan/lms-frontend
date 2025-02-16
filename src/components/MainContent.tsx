import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCalendarAlt,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const MainContent: React.FC = () => {
  return (
    <main className="flex-1 p-8 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-xl font-bold">LEARNING MANAGEMENT SYSTEM</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search class..."
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FontAwesomeIcon icon={faBell} className="text-xl text-gray-600" />
          <FontAwesomeIcon
            icon={faEnvelope}
            className="text-xl text-gray-600"
          />
        </div>
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 p-8 rounded-lg shadow-md mb-8 relative h-72">
        <div className="text-left text-white">
          <h2 className="text-sm font-bold text-yellow-300 uppercase">
            Pemrograman
          </h2>
          <h1 className="text-2xl font-bold mt-2">
            Pemrograman Frontend Modern dengan React dan Angular
          </h1>
          <p className="mt-2 text-sm">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
          </p>
          <div className="flex items-center mt-4 space-x-6">
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUser} className="text-lg" />
              <p className="ml-2 text-sm">Pemateri By Josep</p>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCalendarAlt} className="text-lg" />
              <p className="ml-2 text-sm">14-06-2025</p>
            </div>
          </div>
        </div>
        <button className="absolute bottom-6 right-6 bg-white text-purple-700 px-8 py-4 rounded-lg font-semibold shadow-md text-center hover:bg-purple-100">
          Mulai Learning
        </button>
      </div>

      {/* Modul Kompetensi */}
      <section>
        <h3 className="text-lg font-semibold mb-4">Modul Kompetensi</h3>
        <div className="grid grid-cols-3 gap-4">
          {/* Card Pemrograman */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div
              className="w-full h-28 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://via.placeholder.com/300x150')`,
              }}
            >
              <div className="flex items-center justify-center h-full bg-black bg-opacity-40">
                <span className="text-white font-bold text-sm">
                  PEMROGRAMAN
                </span>
              </div>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-bold text-gray-700 mb-2">
                MATERI KOMPETENSI
              </h4>
              <ul className="space-y-1">
                <li className="text-xs text-gray-600">
                  Pemrograman Frontend Modern dengan React dan Angular
                </li>
                <hr className="border-gray-300" />
                <li className="bg-yellow-200 text-gray-800 text-xs px-2 py-1 rounded-md">
                  Pengembangan API Berstandar Industri dengan GraphQL dan REST
                </li>
                <hr className="border-gray-300" />
                <li className="text-xs text-gray-600">
                  Menerapkan Clean Code dan Desain Pattern dalam Pengembangan
                  Software
                </li>
              </ul>
            </div>
          </div>

          {/* Card Creative Marketing */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-28 bg-red-300 flex items-center justify-center">
              <span className="text-red-800 font-bold text-sm">
                CREATIVE MARKETING
              </span>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-bold text-gray-700 mb-2">
                MATERI KOMPETENSI
              </h4>
              <ul className="space-y-1">
                <li className="text-xs text-gray-600">
                  Storytelling dalam Pemasaran: Mengubah Data menjadi Cerita
                  yang Menginspirasi
                </li>
                <hr className="border-gray-300" />
                <li className="text-xs text-gray-600">
                  Pemasaran Viral: Bagaimana Menjatuhkan Konten yang Cepat
                  Menyebar
                </li>
                <hr className="border-gray-300" />
                <li className="text-xs text-gray-600">
                  Memaksimalkan User-Generated Content dalam Strategi Pemasaran
                  Kreatif
                </li>
              </ul>
            </div>
          </div>

          {/* Card Management SDM */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <div className="w-full h-28 bg-yellow-300 flex items-center justify-center">
              <span className="text-yellow-800 font-bold text-sm">
                MANAGEMENT SDM
              </span>
            </div>
            <div className="p-4">
              <h4 className="text-xs font-bold text-gray-700 mb-2">
                MATERI KOMPETENSI
              </h4>
              <ul className="space-y-1">
                <li className="text-xs text-gray-600">
                  Storytelling dalam Pemasaran: Mengubah Data menjadi Cerita
                  yang Menginspirasi
                </li>
                <hr className="border-gray-300" />
                <li className="text-xs text-gray-600">
                  Pemasaran Viral: Bagaimana Menjatuhkan Konten yang Cepat
                  Menyebar
                </li>
                <hr className="border-gray-300" />
                <li className="text-xs text-gray-600">
                  Memaksimalkan User-Generated Content dalam Strategi Pemasaran
                  Kreatif
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Nilai Peserta */}
      <section className="mt-8">
        <h3 className="text-lg font-semibold mb-4">Nilai Peserta</h3>
        <div className="bg-white rounded-lg shadow-sm p-4">
          <table className="w-full table-auto text-left text-sm">
            <thead>
              <tr className="text-gray-600 font-semibold border-b">
                <th className="py-2">Rank</th>
                <th className="py-2">Name</th>
                <th className="py-2">Class</th>
                <th className="py-2">Modul</th>
                <th className="py-2">Point</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 text-center">1</td>
                <td className="py-2 font-semibold">Parija Faiza</td>
                <td className="py-2">Pemrograman</td>
                <td className="py-2">L1</td>
                <td className="py-2 text-green-600 font-bold">1,234 Point</td>
              </tr>
              <tr className="border-b hover:bg-gray-50">
                <td className="py-2 text-center">2</td>
                <td className="py-2 font-semibold">John Doe</td>
                <td className="py-2">Pemrograman</td>
                <td className="py-2">L2</td>
                <td className="py-2 text-green-600 font-bold">1,232 Point</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
};

export default MainContent;
