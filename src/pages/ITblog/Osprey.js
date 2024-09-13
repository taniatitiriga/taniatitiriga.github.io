// src/pages/ITblog/Krotate.js
import React from 'react';
import GoBackButton from '../../components/goBackButton';
import ospreylocation from '../../assets/Ospreylocation.png';



const CodeBlock = ({ code }) => (
    <pre className="bg-gray-200 p-2 rounded-lg my-2">
        <code>{code}</code>
    </pre>
);

const OspreyPost = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Osprey 1, 2 & 3</h1>
                    {/* Tags */}
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded">
                            OSINT
                        </span>
                        <span className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded">
                            AIP
                        </span>
                    </div>
                    <h2 className="text-xl font-semibold my-3">Osprey 1</h2>
                    <p className="text-gray-600 mb-4">Event: <a href='https://x.com/DIVER_OSINT_CTF' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">DiverOSINT CTF 2024</a> | Difficulty: easy | 100 points | 203 solves</p>

                    <h2 className="text-xl font-semibold my-3">Challenge Description</h2>

                    <p className="mb-2">On 29 November 2023, a US military Osprey (V-22) crashed off Yakushima Island, Japan. The challenge requires identifying the number of this aircraft and its call sign at the time of the crash.</p>

                    <p className="mb-2">To obtain the flag, you need to provide the aircraft registration number and its call sign. The flag format is: Diver24&#123;XX-XXXX_CALLSIGN&#125;. For example, if the aircraft registration number is 01-2345 and the call sign is CALL01, the flag should be Diver24&#123;01-2345_CALL01&#125;.</p>

                    <p className="mb-2">Note that there are three challenges related to this accident in the CTF. Each challenge must be answered correctly to unlock the next.</p>

                    <h2 className="text-xl font-semibold my-3">Solution</h2>

                    <p className='mb-3 mt-6'>
                        For incidents of greater importance, such as aircraft accidents, a record is usually kept. When we search for "V-22 accident list," we can find a record from the <a href='https://asn.flightsafety.org/wikibase/type/V22' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">Aviation Safety Network</a>.
                    </p>
                    <p className='mb-3 mt-6'>This record includes details on the Yakushima accident, showing the aircraft "Registration" as 12-0065 and listing the call sign Gundam 22.</p>
                    <p className='mb-3 mt-6'>Diver24&#123;12-0065_GUNDAM22&#125;</p>



                    <h2 className="text-xl font-semibold my-3">Osprey 2</h2>
                    <p className="text-gray-600 mb-4">Event: <a href='https://x.com/DIVER_OSINT_CTF' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">DiverOSINT CTF 2024</a> | Difficulty: easy | 100 points | 114 solves</p>

                    <h2 className="text-xl font-semibold my-3">Challenge Description</h2>

                    <p className="mb-2">On 15 February 2024, a memorial service concerning this accident was held at a US military base. The ceremony took place at approximately 16:46:37.</p>

                    <p className="mb-2">To obtain the flag, you need to provide the location of the ceremony using the OpenStreetMap Way number. The flag format is: Diver24&#123;123456789&#125;. For example, if the Way number is 123456789, the flag should be Diver24&#123;123456789&#125;.</p>

                    <h2 className="text-xl font-semibold my-3">Solution</h2>

                    <p className='mb-3 mt-6'>
                        Searching for the ceremony we can find this <a href='https://www.stripes.com/branches/air_force/2024-02-15/osprey-crash-japan-yokota-service-13010379.html' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">article</a>.<br />
                        "A 1 ½-hour memorial service began at 10 a.m. inside Yokota’s Taiyo Community Center to remember the eight fallen crewmembers of call sign Gundam 22.", it says, so not before sunset. <br />
                        This, however, sounds oddly familiar:<br />
                        "A half-hour before sunset, approximately 600 people, mostly airmen in uniform, gathered for a brief retreat ceremony on the <i>athletic field outside Yokota’s Samurai Fitness Center</i>. The <i>5 p.m.</i> assembly ... ".<br />
                    </p>
                    <p className='mb-3 mt-6'>
                        By taking a look on Google Maps, we find that next to Yokota’s Samurai Fitness Center there is Yokota Training Field, the only training field nearby.<br/>
                        Sadly, you cannot find it on Open Street Map the same way, but by putting the two websites side-by-side, we can find the osm location around the intersection between Tunner St and Airlift AVE.
                    </p>
                    <img
                        src={ospreylocation}
                        alt="Suggestive side-by-side Open Street Map and Google Maps"
                        className="rounded-none"
                    />
                    

                    <h2 className="text-xl font-semibold my-3">Osprey 3</h2>
                    <p className="text-gray-600 mb-4">Event: <a href='https://x.com/DIVER_OSINT_CTF' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">DiverOSINT CTF 2024</a> | Difficulty: medium | 479 points | 24 solves</p>

                    <h2 className="text-xl font-semibold my-3">Challenge Description</h2>

                    <p className="mb-2">The crashed aircraft was apparently parked at some airport on the night of 15 November 2018. To find the flag, you need to give the elevation (in feet and integer) of that point. You can consider there are no discrepancies in the times of the various data sources. Also, you can refer to the latest information about the airport (no need to use data as of 2018).</p>

                    <p className="mb-2">The flag format is: Diver24&#123;250&#125;. For example, if the elevation is 250 feet, the flag should be Diver24&#123;250&#125;.</p>

                    <p className="mb-2">This is the last challenge about the Osprey crash in this CTF. It also had a limited number of attempts.</p>

                    <h2 className="text-xl font-semibold my-3">Solution</h2>

                    <p className='mb-3 mt-6'>
                        We can find on JetPhotos &#40;a platform I used for multiple OSINT challenges going forward&#41; all the pictures of different aircrafts uploaded by users alongside their location, date and <i>registration number</i>. <br/> 
                        By filtering through registration nr. 12-0065 and year, we find a picture exactly from 15th of November <a href='https://www.jetphotos.com/photo/9144357' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">here</a>.
                        And it has the location as well: "Kraków John Paul II Balice Int'l - EPKK"<br />
                    </p>
                    <p className="mb-2">
                        AIP &#40;Aeronautical Information Publication&#41; offers detailed and accurate information when it comes to airports. And when searching for AIP and the aforementioned polish airport, we can find this <a href='https://www.ais.pansa.pl/publikacje/aip-ifr/' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">site</a>. By translating it from polish and searching in page "EPKK", we can see the official <a href='https://www.ais.pansa.pl/aip/pliki/EP_AD_2_EPKK_1-3-1_en.pdf' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">Aircraft Parking Map</a>.
                    </p>

                    <p className="mb-2">
                        After an hour-ish of wandering around the airport using Google Maps Streetview and a couple of easter eggs, like an ultra-modern church and a funny selfie of two pilots &#40;consider it my challenge for you to find them&#41;, as well as zooming in hard on the background of the JetPhotos image from earlier, I identified the tower in the background on Google Maps.<br/>
                        Upon yet another lengthy side-by-side comparison between Google Maps and the AIP map from earlier, you can identify the parking space in front of the control tower as Apron-13, with an elevation of 774 feet.
                    </p>


                </div>
            </div>
            <GoBackButton path="/blog" />
        </div>
    );
};

export default OspreyPost;
