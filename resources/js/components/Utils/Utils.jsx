import React, { useState } from 'react'

export const myPotensial = {
    'post': [
        {
            'id': 1,
            'image': 'https://i.postimg.cc/cJBrXdYX/penginapan.jpg',
            'title': 'Penginapan',
            'content': 'Tersedia 3 rumah bolon yang dapat digunakan,  wisatawan dapat menginap dengan cara memesan penginapan melalui  website ini. Untuk satu minggu menginap  wisatawan membayar seharga RP.100.000 .'
        },
        {
            'id': 2,
            'image': 'https://i.postimg.cc/8znysVsX/kolam.jpg',
            'title': 'Kolam Renang',
            'content': 'Terdapat kolam berenang yang berjarak kurang lebih 200m dari desa jangga dengan air yang bersumber dari pegunungan, kolam ini dikelilingi pepohonan rimbun di sekitar kolam. Untuk masuk wisatawan hanya membayar Rp 5.000/orang.'
        },
        {
            'id': 3,
            'image': 'https://i.postimg.cc/7PXXd5j7/sawah.png',
            'title': 'Sawah Dan Pegunungan',
            'content': 'Desa Wisata Jangga Dolok memiliki pemandangan yang sangat indah dan menarik untuk dikunjungi dimana terdapat hamparan sawah luas  yang berada dibawah kaki pegunungan yang sangat indah untuk di pandang.'
        }
    ]
}

export const myPost = {
    articles: [
        {
            "source": {
                "id": null,
                "name": "AllAfrica - Top Africa News"
            },
            "author": "Vanguard",
            "title": "Kunjungan Menteri ke Desa Jangga",
            "description": "Pak menteri selanjutnya bersama rombongan didampingi oleh wakil Bupati Toba Samosir Ir Hulman Sitorus dan juga Direktur BODT Arie Prasetyo bersama memasuki rumah adat Batak sebagai salah satu ikon Desa... ",
            "url": "#",
            "urlToImage": "https://i.postimg.cc/cJBrXdYX/penginapan.jpg",
            "publishedAt": "2020-11-12T08:19:13Z",
            "content": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges, celebrated the … [+4027 chars]"
        },
        {
            "source": {
                "id": null,
                "name": "Vanguard"
            },
            "author": "sunday",
            "title": "Great Harvest Festifal Desa Jangga",
            "description": "Jangga Dolok, MC Tobasa- Bupati Tobasa Darwin Siagian ,Kapolres Tobasa AKBP Agus Waluyo, S.I.K., Sekdakab Audhy Murphy Sitorus menghadiri Great Harves Festival (GHF) pelaksanaan Panen Raya diladang masyarakat yang telah siap...",
            "url": "#",
            "urlToImage": "https://i.postimg.cc/MHvH6RLF/tourist.jpg",
            "publishedAt": "2020-11-09T07:50:48Z",
            "content": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges\r\n, celebrated th… [+3652 chars]"
        }, {
            "source": {
                "id": "",
                "name": "Vanguard"
            },
            "author": "sunday",
            "title": "Budaya Desa Jangga Dolok",
            "description": "Bagi pecinta budaya, anda dapat menggali keberadaan perkampungan batak tersebut, baik dari segi konstruksi, filosofi, ukiran, dan ornamen lainnya, begitu juga dengan denah dan tata letak bangunannya.",
            "url": "",
            "urlToImage": "https://i.postimg.cc/7PXXd5j7/sawah.png",
            "publishedAt": "2020-11-01T07:50:48Z",
            "content": "Bitcoin marked its 12th anniversary on October 31st. In response, its price has jumped from $13,000 to $15,000 in less than 2 weeks. The crypto community, including Bitcoin exchanges\r\n, celebrated th… [+3652 chars]"
        },
    ]
}

export const myTestimonial = [
    {
        description:
            'Saya sangat senang selama berada di desa ini. Pemandangan yang ada sangat idah, dan kami disambut dengan sangat ramah.',
        user: 'Naldo Samosir',
        userProfile: 'https://i.imgur.com/JSW6mEk.png'
    },
    {
        description:
            'Kami mengikuti berbagai kegiatan yang ada didesa tersebut, seperi Manortor, ikut panen padi bersama warga setempat, berenang di kolam berenang dan mengambil banyak foto di desa ini.',
        user: 'Samuel Manalu',
        userProfile: 'https://i.imgur.com/0Clfnu7.png'
    },
    {
        description:
            'Kami mengikuti berbagai kegiatan yang ada didesa tersebut, seperi Manortor, ikut panen padi bersama warga setempat, berenang di kolam berenang dan mengambil banyak foto di desa ini.',
        user: 'Hotnida Siagian',
        userProfile: 'https://i.imgur.com/4KeKvtH.png'
    }
];

export const truncate = (str, n) => {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

export const useForm = (callback, initialState = {}) => {
    const [values, setValues] = useState(initialState)

    const onChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        callback();
    }

    return {
        onChange,
        onSubmit,
        values
    }
}