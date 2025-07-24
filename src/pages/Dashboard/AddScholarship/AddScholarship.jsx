import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import useAuth from '../../../hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const countryName = [
    { "id": 1, "code": "AF", "name": "Afghanistan" },
    { "id": 2, "code": "AL", "name": "Albania" },
    { "id": 3, "code": "DZ", "name": "Algeria" },
    { "id": 4, "code": "AS", "name": "American Samoa" },
    { "id": 5, "code": "AD", "name": "Andorra" },
    { "id": 6, "code": "AO", "name": "Angola" },
    { "id": 7, "code": "AI", "name": "Anguilla" },
    { "id": 8, "code": "AQ", "name": "Antarctica" },
    { "id": 9, "code": "AG", "name": "Antigua and Barbuda" },
    { "id": 10, "code": "AR", "name": "Argentina" },
    { "id": 11, "code": "AM", "name": "Armenia" },
    { "id": 12, "code": "AW", "name": "Aruba" },
    { "id": 13, "code": "AU", "name": "Australia" },
    { "id": 14, "code": "AT", "name": "Austria" },
    { "id": 15, "code": "AZ", "name": "Azerbaijan" },
    { "id": 16, "code": "BS", "name": "Bahamas" },
    { "id": 17, "code": "BH", "name": "Bahrain" },
    { "id": 18, "code": "BD", "name": "Bangladesh" },
    { "id": 19, "code": "BB", "name": "Barbados" },
    { "id": 20, "code": "BY", "name": "Belarus" },
    { "id": 21, "code": "BE", "name": "Belgium" },
    { "id": 22, "code": "BZ", "name": "Belize" },
    { "id": 23, "code": "BJ", "name": "Benin" },
    { "id": 24, "code": "BM", "name": "Bermuda" },
    { "id": 25, "code": "BT", "name": "Bhutan" },
    { "id": 26, "code": "BO", "name": "Bolivia (Plurinational State of)" },
    { "id": 27, "code": "BQ", "name": "Bonaire, Sint Eustatius and Saba" },
    { "id": 28, "code": "BA", "name": "Bosnia and Herzegovina" },
    { "id": 29, "code": "BW", "name": "Botswana" },
    { "id": 30, "code": "BV", "name": "Bouvet Island" },
    { "id": 31, "code": "BR", "name": "Brazil" },
    { "id": 32, "code": "IO", "name": "British Indian Ocean Territory" },
    { "id": 33, "code": "BN", "name": "Brunei Darussalam" },
    { "id": 34, "code": "BG", "name": "Bulgaria" },
    { "id": 35, "code": "BF", "name": "Burkina Faso" },
    { "id": 36, "code": "BI", "name": "Burundi" },
    { "id": 37, "code": "CV", "name": "Cabo Verde" },
    { "id": 38, "code": "KH", "name": "Cambodia" },
    { "id": 39, "code": "CM", "name": "Cameroon" },
    { "id": 40, "code": "CA", "name": "Canada" },
    { "id": 41, "code": "KY", "name": "Cayman Islands" },
    { "id": 42, "code": "CF", "name": "Central African Republic" },
    { "id": 43, "code": "TD", "name": "Chad" },
    { "id": 44, "code": "CL", "name": "Chile" },
    { "id": 45, "code": "CN", "name": "China" },
    { "id": 46, "code": "CX", "name": "Christmas Island" },
    { "id": 47, "code": "CC", "name": "Cocos (Keeling) Islands" },
    { "id": 48, "code": "CO", "name": "Colombia" },
    { "id": 49, "code": "KM", "name": "Comoros" },
    { "id": 50, "code": "CD", "name": "Congo (Democratic Republic of the)" },
    { "id": 51, "code": "CG", "name": "Congo" },
    { "id": 52, "code": "CK", "name": "Cook Islands" },
    { "id": 53, "code": "CR", "name": "Costa Rica" },
    { "id": 54, "code": "HR", "name": "Croatia" },
    { "id": 55, "code": "CU", "name": "Cuba" },
    { "id": 56, "code": "CW", "name": "Curaçao" },
    { "id": 57, "code": "CY", "name": "Cyprus" },
    { "id": 58, "code": "CZ", "name": "Czechia" },
    { "id": 59, "code": "CI", "name": "Côte d'Ivoire" },
    { "id": 60, "code": "DK", "name": "Denmark" },
    { "id": 61, "code": "DJ", "name": "Djibouti" },
    { "id": 62, "code": "DM", "name": "Dominica" },
    { "id": 63, "code": "DO", "name": "Dominican Republic" },
    { "id": 64, "code": "EC", "name": "Ecuador" },
    { "id": 65, "code": "EG", "name": "Egypt" },
    { "id": 66, "code": "SV", "name": "El Salvador" },
    { "id": 67, "code": "GQ", "name": "Equatorial Guinea" },
    { "id": 68, "code": "ER", "name": "Eritrea" },
    { "id": 69, "code": "EE", "name": "Estonia" },
    { "id": 70, "code": "SZ", "name": "Eswatini" },
    { "id": 71, "code": "ET", "name": "Ethiopia" },
    { "id": 72, "code": "FK", "name": "Falkland Islands (Malvinas)" },
    { "id": 73, "code": "FO", "name": "Faroe Islands" },
    { "id": 74, "code": "FJ", "name": "Fiji" },
    { "id": 75, "code": "FI", "name": "Finland" },
    { "id": 76, "code": "FR", "name": "France" },
    { "id": 77, "code": "GF", "name": "French Guiana" },
    { "id": 78, "code": "PF", "name": "French Polynesia" },
    { "id": 79, "code": "TF", "name": "French Southern Territories" },
    { "id": 80, "code": "GA", "name": "Gabon" },
    { "id": 81, "code": "GM", "name": "Gambia" },
    { "id": 82, "code": "GE", "name": "Georgia" },
    { "id": 83, "code": "DE", "name": "Germany" },
    { "id": 84, "code": "GH", "name": "Ghana" },
    { "id": 85, "code": "GI", "name": "Gibraltar" },
    { "id": 86, "code": "GR", "name": "Greece" },
    { "id": 87, "code": "GL", "name": "Greenland" },
    { "id": 88, "code": "GD", "name": "Grenada" },
    { "id": 89, "code": "GP", "name": "Guadeloupe" },
    { "id": 90, "code": "GU", "name": "Guam" },
    { "id": 91, "code": "GT", "name": "Guatemala" },
    { "id": 92, "code": "GG", "name": "Guernsey" },
    { "id": 93, "code": "GN", "name": "Guinea" },
    { "id": 94, "code": "GW", "name": "Guinea-Bissau" },
    { "id": 95, "code": "GY", "name": "Guyana" },
    { "id": 96, "code": "HT", "name": "Haiti" },
    { "id": 97, "code": "HM", "name": "Heard Island and McDonald Islands" },
    { "id": 98, "code": "VA", "name": "Holy See" },
    { "id": 99, "code": "HN", "name": "Honduras" },
    { "id": 100, "code": "HK", "name": "Hong Kong" },
    { "id": 101, "code": "HU", "name": "Hungary" },
    { "id": 102, "code": "IS", "name": "Iceland" },
    { "id": 103, "code": "IN", "name": "India" },
    { "id": 104, "code": "ID", "name": "Indonesia" },
    { "id": 105, "code": "IR", "name": "Iran (Islamic Republic of)" },
    { "id": 106, "code": "IQ", "name": "Iraq" },
    { "id": 107, "code": "IE", "name": "Ireland" },
    { "id": 108, "code": "IM", "name": "Isle of Man" },
    { "id": 109, "code": "IL", "name": "Israel" },
    { "id": 110, "code": "IT", "name": "Italy" },
    { "id": 111, "code": "JM", "name": "Jamaica" },
    { "id": 112, "code": "JP", "name": "Japan" },
    { "id": 113, "code": "JE", "name": "Jersey" },
    { "id": 114, "code": "JO", "name": "Jordan" },
    { "id": 115, "code": "KZ", "name": "Kazakhstan" },
    { "id": 116, "code": "KE", "name": "Kenya" },
    { "id": 117, "code": "KI", "name": "Kiribati" },
    { "id": 118, "code": "KP", "name": "Korea (Democratic People's Republic of)" },
    { "id": 119, "code": "KR", "name": "Korea (Republic of)" },
    { "id": 120, "code": "KW", "name": "Kuwait" },
    { "id": 121, "code": "KG", "name": "Kyrgyzstan" },
    { "id": 122, "code": "LA", "name": "Lao People's Democratic Republic" },
    { "id": 123, "code": "LV", "name": "Latvia" },
    { "id": 124, "code": "LB", "name": "Lebanon" },
    { "id": 125, "code": "LS", "name": "Lesotho" },
    { "id": 126, "code": "LR", "name": "Liberia" },
    { "id": 127, "code": "LY", "name": "Libya" },
    { "id": 128, "code": "LI", "name": "Liechtenstein" },
    { "id": 129, "code": "LT", "name": "Lithuania" },
    { "id": 130, "code": "LU", "name": "Luxembourg" },
    { "id": 131, "code": "MO", "name": "Macao" },
    { "id": 132, "code": "MG", "name": "Madagascar" },
    { "id": 133, "code": "MW", "name": "Malawi" },
    { "id": 134, "code": "MY", "name": "Malaysia" },
    { "id": 135, "code": "MV", "name": "Maldives" },
    { "id": 136, "code": "ML", "name": "Mali" },
    { "id": 137, "code": "MT", "name": "Malta" },
    { "id": 138, "code": "MH", "name": "Marshall Islands" },
    { "id": 139, "code": "MQ", "name": "Martinique" },
    { "id": 140, "code": "MR", "name": "Mauritania" },
    { "id": 141, "code": "MU", "name": "Mauritius" },
    { "id": 142, "code": "YT", "name": "Mayotte" },
    { "id": 143, "code": "MX", "name": "Mexico" },
    { "id": 144, "code": "FM", "name": "Micronesia (Federated States of)" },
    { "id": 145, "code": "MD", "name": "Moldova (Republic of)" },
    { "id": 146, "code": "MC", "name": "Monaco" },
    { "id": 147, "code": "MN", "name": "Mongolia" },
    { "id": 148, "code": "ME", "name": "Montenegro" },
    { "id": 149, "code": "MS", "name": "Montserrat" },
    { "id": 150, "code": "MA", "name": "Morocco" },
    { "id": 151, "code": "MZ", "name": "Mozambique" },
    { "id": 152, "code": "MM", "name": "Myanmar" },
    { "id": 153, "code": "NA", "name": "Namibia" },
    { "id": 154, "code": "NR", "name": "Nauru" },
    { "id": 155, "code": "NP", "name": "Nepal" },
    { "id": 156, "code": "NL", "name": "Netherlands" },
    { "id": 157, "code": "NC", "name": "New Caledonia" },
    { "id": 158, "code": "NZ", "name": "New Zealand" },
    { "id": 159, "code": "NI", "name": "Nicaragua" },
    { "id": 160, "code": "NE", "name": "Niger" },
    { "id": 161, "code": "NG", "name": "Nigeria" },
    { "id": 162, "code": "NU", "name": "Niue" },
    { "id": 163, "code": "NF", "name": "Norfolk Island" },
    { "id": 164, "code": "MP", "name": "Northern Mariana Islands" },
    { "id": 165, "code": "NO", "name": "Norway" },
    { "id": 166, "code": "OM", "name": "Oman" },
    { "id": 167, "code": "PK", "name": "Pakistan" },
    { "id": 168, "code": "PW", "name": "Palau" },
    { "id": 169, "code": "PS", "name": "Palestine, State of" },
    { "id": 170, "code": "PA", "name": "Panama" },
    { "id": 171, "code": "PG", "name": "Papua New Guinea" },
    { "id": 172, "code": "PY", "name": "Paraguay" },
    { "id": 173, "code": "PE", "name": "Peru" },
    { "id": 174, "code": "PH", "name": "Philippines" },
    { "id": 175, "code": "PN", "name": "Pitcairn" },
    { "id": 176, "code": "PL", "name": "Poland" },
    { "id": 177, "code": "PT", "name": "Portugal" },
    { "id": 178, "code": "PR", "name": "Puerto Rico" },
    { "id": 179, "code": "QA", "name": "Qatar" },
    { "id": 180, "code": "MK", "name": "Republic of North Macedonia" },
    { "id": 181, "code": "RO", "name": "Romania" },
    { "id": 182, "code": "RU", "name": "Russian Federation" },
    { "id": 183, "code": "RW", "name": "Rwanda" },
    { "id": 184, "code": "RE", "name": "Réunion" },
    { "id": 185, "code": "BL", "name": "Saint Barthélemy" },
    { "id": 186, "code": "SH", "name": "Saint Helena, Ascension and Tristan da Cunha" },
    { "id": 187, "code": "KN", "name": "Saint Kitts and Nevis" },
    { "id": 188, "code": "LC", "name": "Saint Lucia" },
    { "id": 189, "code": "MF", "name": "Saint Martin (French part)" },
    { "id": 190, "code": "PM", "name": "Saint Pierre and Miquelon" },
    { "id": 191, "code": "VC", "name": "Saint Vincent and the Grenadines" },
    { "id": 192, "code": "WS", "name": "Samoa" },
    { "id": 193, "code": "SM", "name": "San Marino" },
    { "id": 194, "code": "ST", "name": "Sao Tome and Principe" },
    { "id": 195, "code": "SA", "name": "Saudi Arabia" },
    { "id": 196, "code": "SN", "name": "Senegal" },
    { "id": 197, "code": "RS", "name": "Serbia" },
    { "id": 198, "code": "SC", "name": "Seychelles" },
    { "id": 199, "code": "SL", "name": "Sierra Leone" },
    { "id": 200, "code": "SG", "name": "Singapore" },
    { "id": 201, "code": "SX", "name": "Sint Maarten (Dutch part)" },
    { "id": 202, "code": "SK", "name": "Slovakia" },
    { "id": 203, "code": "SI", "name": "Slovenia" },
    { "id": 204, "code": "SB", "name": "Solomon Islands" },
    { "id": 205, "code": "SO", "name": "Somalia" },
    { "id": 206, "code": "ZA", "name": "South Africa" },
    { "id": 207, "code": "GS", "name": "South Georgia and the South Sandwich Islands" },
    { "id": 208, "code": "SS", "name": "South Sudan" },
    { "id": 209, "code": "ES", "name": "Spain" },
    { "id": 210, "code": "LK", "name": "Sri Lanka" },
    { "id": 211, "code": "SD", "name": "Sudan" },
    { "id": 212, "code": "SR", "name": "Suriname" },
    { "id": 213, "code": "SJ", "name": "Svalbard and Jan Mayen" },
    { "id": 214, "code": "SE", "name": "Sweden" },
    { "id": 215, "code": "CH", "name": "Switzerland" },
    { "id": 216, "code": "SY", "name": "Syrian Arab Republic" },
    { "id": 217, "code": "TW", "name": "Taiwan, Province of China" },
    { "id": 218, "code": "TJ", "name": "Tajikistan" },
    { "id": 219, "code": "TZ", "name": "Tanzania, United Republic of" },
    { "id": 220, "code": "TH", "name": "Thailand" },
    { "id": 221, "code": "TL", "name": "Timor-Leste" },
    { "id": 222, "code": "TG", "name": "Togo" },
    { "id": 223, "code": "TK", "name": "Tokelau" },
    { "id": 224, "code": "TO", "name": "Tonga" },
    { "id": 225, "code": "TT", "name": "Trinidad and Tobago" },
    { "id": 226, "code": "TN", "name": "Tunisia" },
    { "id": 227, "code": "TR", "name": "Turkey" },
    { "id": 228, "code": "TM", "name": "Turkmenistan" },
    { "id": 229, "code": "TC", "name": "Turks and Caicos Islands" },
    { "id": 230, "code": "TV", "name": "Tuvalu" },
    { "id": 231, "code": "UG", "name": "Uganda" },
    { "id": 232, "code": "UA", "name": "Ukraine" },
    { "id": 233, "code": "AE", "name": "United Arab Emirates" },
    { "id": 234, "code": "GB", "name": "United Kingdom of Great Britain and Northern Ireland" },
    { "id": 235, "code": "US", "name": "United States of America" },
    { "id": 236, "code": "UM", "name": "United States Minor Outlying Islands" },
    { "id": 237, "code": "UY", "name": "Uruguay" },
    { "id": 238, "code": "UZ", "name": "Uzbekistan" },
    { "id": 239, "code": "VU", "name": "Vanuatu" },
    { "id": 240, "code": "VE", "name": "Venezuela (Bolivarian Republic of)" },
    { "id": 241, "code": "VN", "name": "Viet Nam" },
    { "id": 242, "code": "VG", "name": "Virgin Islands (British)" },
    { "id": 243, "code": "VI", "name": "Virgin Islands (U.S.)" },
    { "id": 244, "code": "WF", "name": "Wallis and Futuna" },
    { "id": 245, "code": "EH", "name": "Western Sahara" },
    { "id": 246, "code": "YE", "name": "Yemen" },
    { "id": 247, "code": "ZM", "name": "Zambia" },
    { "id": 248, "code": "ZW", "name": "Zimbabwe" }
]


const AddScholarship = () => {
    const { user } = useAuth()
    const [imageFile, setImageFile] = useState(null);
    const [fileError, setFileError] = useState('');
    const [loading, setLoading] = useState(false);
    const axiosInstance = useAxiosSecure();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onImageFileSelect = (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append('image', file);
        setImageFile(formData)
    }
    const uploadImageToImageBB = async () => {
        // const image = e.target.files[0];
        // console.log(image)
        // const formData = new FormData();
        // formData.append('image', image);

        const url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_imagebb_key}`

        const imageBBRes = await axios.post(url, imageFile)
        if (imageBBRes.data.status === 200) {
            return (imageBBRes.data.data.url);
        }
        else if (!imageBBRes.data.status === 200) {
            return null
        }

    }


    const onFormSubmit = async (data) => {
        Swal.fire({
            title: "Submit Scholarship?",
            text: "Is your scholarship information correct!",
            icon: "question",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Submit!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                console.log(data)
                setFileError('')
                if (imageFile === null) {
                    setFileError('Some error happen in institute Logo Field');
                    return;
                }
                setLoading(true)
                const profilePic = await uploadImageToImageBB();

                if (profilePic === null) {
                    setLoading(false)
                    Swal.fire({
                        title: "Profile Image Failed!",
                        text: 'There might some error occurred uploading Image',
                        icon: "error",

                    });
                    return
                }

                // scholarship data
                const scholarshipData = {
                    institute_logo: profilePic,
                    publisher_email: user?.email,
                    ...data,
                    posted_at: new Date().toISOString(),
                }

                //scholarship dato upload in DB
                const result = await axiosInstance.post(`/scholarship`, scholarshipData);
                console.log(result.data)
                if (result.data.insertedId) {
                    Swal.fire({
                        title: "Scholarship Published!",
                        text: 'Your scholarship published successfully.',
                        icon: "success",
                    });
                    setLoading(false)
                }
                setLoading(false)
            }
        });

    }




    return (
        <div className='p-2 pt-10 shadow-[0_0px_15px_5px_rgba(0,0,0,0.05),0_0px_20px_2px_rgba(0,0,0,0.05)]'>
            <h1 className="text-4xl font-bold text-center ">
                Add a Scholarship
            </h1>
            <div className="max-w-3xl  mx-auto">
                <form
                    onSubmit={handleSubmit(onFormSubmit)}
                    className=''>

                    <div className="">
                        <fieldset className="fieldset grid sm:grid-cols-2 sm:gap-x-5 bg-base-200 rounded-box  p-4">
                            <legend className="fieldset-legend">Institute Details</legend>

                            {/* Scholarship Name */}
                            <fieldset className='fieldset'>
                                <label className='label'>Scholarship Name:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Scholarship Name'
                                    type="text"
                                    {
                                    ...register('scholarship_name', {
                                        required: 'Scholarship Name is required',
                                    })
                                    }
                                />
                                {
                                    errors?.scholarship_name &&
                                    <p className="text-red-500">
                                        {errors?.scholarship_name?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute Name */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution Name:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Institute Name'
                                    type="text"
                                    {
                                    ...register('institute_name', {
                                        required: 'Institute Name is required',
                                    })
                                    }
                                />
                                {
                                    errors?.institute_name &&
                                    <p className="text-red-500">
                                        {errors?.institute_name?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute Country */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution Country:</label>
                                <select
                                    {
                                    ...register('institute_country', {
                                        required: 'Institute Country is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option value='' disabled={true}>Select a country</option>
                                    {countryName?.map(country => <option
                                        value={country?.name}
                                        key={country.id}>
                                        {country?.name}
                                    </option>)}
                                </select>
                                {
                                    errors?.institute_country &&
                                    <p className="text-red-500">
                                        {errors?.institute_country?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute City */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institute City:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Institute City'
                                    type="text"
                                    {
                                    ...register('institute_city', {
                                        required: 'Institute City is required',
                                    })
                                    }
                                />
                                {
                                    errors?.institute_city &&
                                    <p className="text-red-500">
                                        {errors?.institute_city?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institution World Rank */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institution World Rank:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Institution World Rank'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('world_rank', {
                                        required: 'Institution World Rank is required',
                                    })
                                    }
                                />
                                {
                                    errors?.world_rank &&
                                    <p className="text-red-500">
                                        {errors?.world_rank?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Institute Logo */}
                            <fieldset className='fieldset'>
                                <label className='label'>Institute Logo:</label>
                                <input
                                    type="file"
                                    onChange={onImageFileSelect}
                                    required
                                    className="file-input w-full file-input-success" />
                                {
                                    fileError &&
                                    <p className="text-red-500">
                                        {fileError}
                                    </p>
                                }
                            </fieldset>

                        </fieldset>

                        <fieldset className="fieldset bg-base-200 grid sm:grid-cols-2 sm:gap-x-5 rounded-box  p-4">
                            <legend className="fieldset-legend">Scholarship Details</legend>
                            {/* Subject Category */}
                            <fieldset className='fieldset'>
                                <label className='label'>Subject Category:</label>
                                <select
                                    {
                                    ...register('subject', {
                                        required: 'Subject Category is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option
                                        value=''
                                        disabled={true}>Select a Subject
                                    </option>
                                    <option value='agriculture'>Agriculture</option>
                                    <option value='engineering'>Engineering</option>
                                    <option value='doctor'>Doctor</option>
                                </select>
                                {
                                    errors?.subject &&
                                    <p className="text-red-500">
                                        {errors?.subject?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Scholarship Category */}
                            <fieldset className='fieldset'>
                                <label className='label'>Scholarship Category:</label>
                                <select
                                    {
                                    ...register('scholarship_category', {
                                        required: 'Scholarship Category is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option
                                        value=''
                                        disabled={true}>Select a Scholarship Category
                                    </option>
                                    <option value='full_fund'>Full fund</option>
                                    <option value='partial_fund'>Partial fund</option>
                                    <option value='self_fund'>Self fund</option>
                                </select>
                                {
                                    errors?.scholarship_category &&
                                    <p className="text-red-500">
                                        {errors?.scholarship_category?.message}
                                    </p>
                                }
                            </fieldset>

                            {/* Scholarship Degree */}
                            <fieldset className='fieldset'>
                                <label className='label'>Scholarship Degree:</label>
                                <select
                                    {
                                    ...register('degree', {
                                        required: 'Scholarship Degree is required'
                                    })
                                    }

                                    defaultValue=""
                                    className="select w-full">
                                    <option
                                        value=''
                                        disabled={true}>Select a Degree
                                    </option>
                                    <option value='diploma'>Diploma</option>
                                    <option value='bachelor'>Bachelor</option>
                                    <option value='masters'>Masters</option>
                                </select>
                                {
                                    errors?.degree &&
                                    <p className="text-red-500">
                                        {errors?.degree?.message}
                                    </p>
                                }
                            </fieldset>

                        </fieldset>

                        <fieldset className="fieldset grid sm:grid-cols-2 sm:gap-x-5 bg-base-200  rounded-box p-4">
                            <legend className="fieldset-legend">Payment and Deadline</legend>
                            {/* Tuition fees */}
                            <fieldset className='fieldset'>
                                <label className='label'>Tuition fees:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Tuition fees'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('tuition_fees', {

                                    })
                                    }
                                />
                                {
                                    errors?.tuition_fees &&
                                    <p className="text-red-500">
                                        {errors?.tuition_fees?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Application fees */}
                            <fieldset className='fieldset'>
                                <label className='label'>Application fees:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Application fees'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('application_fee', {
                                        required: 'Application fees is required',
                                    })
                                    }
                                />
                                {
                                    errors?.application_fee &&
                                    <p className="text-red-500">
                                        {errors?.application_fee?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Service charge */}
                            <fieldset className='fieldset'>
                                <label className='label'>Service charge:</label>
                                <input
                                    className='input w-full'
                                    placeholder='Service charge'
                                    type="number"
                                    onWheel={(e) => e.target.blur()}
                                    {
                                    ...register('service_charge', {
                                        required: 'Service charge is required',
                                    })
                                    }
                                />
                                {
                                    errors?.service_charge &&
                                    <p className="text-red-500">
                                        {errors?.service_charge?.message}
                                    </p>
                                }
                            </fieldset>


                            {/* Application Deadline */}
                            <fieldset className='fieldset'>
                                <label className='label'>Application Deadline:</label>
                                <input
                                    className='input w-full'
                                    type="date"
                                    {
                                    ...register('application_deadline', {
                                        required: 'Application Deadline is required',
                                    })
                                    }
                                />
                                {
                                    errors?.application_deadline &&
                                    <p className="text-red-500">
                                        {errors?.application_deadline?.message}
                                    </p>
                                }
                            </fieldset>

                        </fieldset>




                    </div>
                    <button
                        disabled={loading}
                        role='submit'
                        className="btn btn-primary w-full text-black mt-4">
                        Submit Scholarship
                        {
                            loading &&
                            <span className="loading text-success loading-spinner loading-md"></span>
                        }
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddScholarship;