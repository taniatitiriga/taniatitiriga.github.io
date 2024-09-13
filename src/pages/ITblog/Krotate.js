// src/pages/ITblog/Krotate.js
import React from 'react';
import GoBackButton from '../../components/goBackButton';


const CodeBlock = ({ code }) => (
    <pre className="bg-gray-200 p-2 rounded-lg my-2">
        <code>{code}</code>
    </pre>
);

const KrotatePost = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">Krotate</h1>
                    {/* Tags */}
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded">
                            Cryptography
                        </span>
                        <span className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded">
                            SHA512
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">Event: <a href='https://unbreakable.ro/' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">UNbreakable (teams) 2024</a> | Difficulty: medium | 370 points | 13 solves</p>

                    {/* Introduction */}
                    <h2 className="text-xl font-semibold my-3">What we know</h2>
                    <p className="mb-2">
                        We are provided by the challenge with 3 files:
                    </p>

                    <ul className="list-disc list-inside mb-2">
                        <li>chall.py</li>
                    </ul>

                    <CodeBlock
                        code={`from Crypto.Random import get_random_bytes

KEY_LEN = 100
key = get_random_bytes(KEY_LEN)
R = 0x01

def RGEN():
    global R
    R = ((R << 1) ^ (0x71 if (R & 0x80) else 0)) & 0xFF
    return R

def xor_text(text, key):
    return bytes([text[i] ^ key[i] for i in range(len(text))])

def next_key(key):
    return bytes([key[i] ^ RGEN() for i in range(len(key))])

def encrypt(text, key):
    ciphertext = b""
    blocks = [text[i : i + KEY_LEN] for i in range(0, len(text), KEY_LEN)]

    for block in blocks:
        ciphertext += xor_text(block, key)
        key = next_key(key)

    return ciphertext`}
                    />

                    <ul className="list-disc list-inside my-2">
                        <li>cyphertext.txt &#40;find the file <a href='https://unr24-echipe.cyber-edu.co/challenge/9b3d603e-fd49-467b-baab-34b0c450a5bb?tenant=unbreakable' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">here</a>&#41;</li>
                    </ul>

                    <CodeBlock
                        code={`2#NÎDÝ=XÜ°%~î¼÷:}=ÙûÒsÒšJéW ... (3KB of ciphertext)`}
                    />

                    <ul className="list-disc list-inside my-2">
                        <li>known.txt</li>
                    </ul>

                    <CodeBlock
                        code={`-----BEGIN PGP SIGNATURE-----

iQGzBAEBCgAdFiEEzPHvlUeruVX0heb1tpW1DotF5QYFAmWo5oMACgkQtpW1DotF
5QY62wwAudnaWyEAHCzLfhoqGRacozcmhagBr+HlPhEOApd6lwIZ01At+Q4Yj5z2
IYk2kpdxe6fZ5pZZoGyMk5TrNQaeHKn+w9hKdNsaQTZSPSgXT9pQ1FyiaYe5tKEf
Zs9g4k+mEbK7uJpVfCBfvMnxiARxyNzvTs4/EEP0/KGxwpuWIrU8Xwz51gZFNJgr
3cjeV6esIxyAoPHSpzvGwC2YA3unsSh9bWS6BjtmOs2As1YC7asbO0dRANcjz//0
mYDAXM1W68ASrHT22COCpv+r5QBD2tPiKrjdMSYGkSXfWsTAf+bfu5VM/nGUKD/n
gShplAr2yLdwWkz6UTMboMZRMK5UfjzumX99ICO3hYL0mU3QQXyFnkXtR0ygcGOy
Xke5v/1O4iNmwmn0G/xBF4s2kfeh9DOFyBJeHtgMuNVXVkZOe2FVDecK9UOR4/7h
Z63mLMvOhlniIcy5HrIUXfz0HQAgVGye7jgDvBJCS9Y2dc+5mcHraFj+FEfL8QIR
K7XNR2Tf
=pum0
-----END PGP SIGNATURE-----`}
                    />
                    <h2 className="text-xl font-semibold my-3">Summary</h2>
                    <p className="mb-2">
                        I used the given PGP signature to find the key used on the last block*. From the last block up, I regenerate the R at that step, use it to find the key at that step and then decrypt the respective block with the proper key.
                    </p>
                    <p className='mb-2'>* Plaintext is split into blocks of 100 characters:</p>
                    <CodeBlock
                        code={`KEY_LEN = 100
blocks = [text[i : i + KEY_LEN] for i in range(0, len(text), KEY_LEN)]`}
                    />
                    <h2 className="text-xl font-semibold my-3">Matching the blocks</h2>
                    <p className="mb-2">
                        I kept the original functions from the given code: <code>RGEN&#40;&#41;</code>, <code>xor_text&#40;&#41;</code> and <code>next_key&#40;&#41;</code>.<br />
                        The length of ciphertext was not divisible by 100, so I cut the remainder part out and handled the last complete block. Then I also trimmed the PGP signature to match that exact block.
                    </p>
                    <p className="mb-4">
                        Here is how:
                    </p>
                    <CodeBlock
                        code={`ciphertext = b""
with open("ciphertext.txt", "rb") as f:
    ciphertext = f.read()

pgp = ""
with open("pgpsgn.txt", "r") as f: # PGP signature
    pgp = f.read()

# ignore the last chunk (of length < 100)
len_remainder = len(ciphertext) % 100
ciphertext = ciphertext[:-len_remainder]

#trim pgp signature to match
pgplength = len(pgp)
pgp = pgp[(pgplength len_remainder 99): (pgplength len_remainder + 1)]
pgp bytes(pgp, 'utf-8')`}
                    />
                    <h2 className="text-xl font-semibold my-3">Finding the key</h2>

                    <p className='mb-3 mt-6'>Now, we have the original and the encrypted versions of the last block of length 100. These xor'ed together will produce the last key, which can be used to obtain all the other keys.</p>
                    <CodeBlock
                        code={`# create key for the last block
key = xor_text(ciphertext[-100:), pgp)`}
                    />
                    <h2 className="text-xl font-semibold my-3">Bottoms up!</h2>
                    <p className='my-3'>From the last chunk to the first, we xor it with the current key &#40;initially, that is the last key: found previously for the last block&#41;.<br/>
                    From the current key, we make the previous key: by regenerating the R with 100 less calls for RGEN&#40;&#41;. Then, we reunite the decrypted chunks to print the whole raw message.</p>
                    <CodeBlock
                        code={`# functions from the original code

ciphertext = b""
with open("ciphertext.txt", "rb") as f:
    ciphertext = f.read()

pgp = ""
with open("pgpsgn.txt", "r") as f:  # PGP signature
    pgp = f.read()

# ignore the last chunk (of length < 100)
len_remainder = len(ciphertext) % 100
ciphertext = ciphertext[:-len_remainder]

# trim pgp signature to match
pgplength = len(pgp)
pgp = pgp[(pgplength - len_remainder - 99): (pgplength - len_remainder + 1)]
pgp = bytes(pgp, 'utf-8')

# create key for the last block
key = xor_text(ciphertext[-100:], pgp)

raw = ""
for i in range(29):

    # prepend decrypted chunk
    raw = (xor_text(ciphertext[-100 * (i + 1):len(ciphertext) - i * 100], key)).decode() + raw

    # regenerate R for previous key
    R = 0x01
    for j in range(2800 - (i + 1) * 100):
        RGEN()
    key = next_key(key)

# print final message
raw += "D PGP SIGNATURE-----"
print(raw)
`}
                    />
                    <p className="my-3">
                        Spoiler!<br />

                        This is the decrypted output:
                    </p>
                    <CodeBlock
                        code={`-----BEGIN PGP SIGNED MESSAGE-----
Hash: SHA512

URGENT COMMUNICATION

To all personnel and key stakeholders,
I write to you under pressing circumstances that demand our immediate attention and swift collective action. Our critical systems, the very lifeblood of our operations, are facing an imminent threat that requires the utmost urgency in our response.
As the hands of the clock move inexorably forward, our window of opportunity to secure these systems narrows. The potential consequences of inaction are severe, and we cannot afford to underestimate the gravity of the situation.
Each member of our organization is a crucial component in this endeavor. I implore you to mobilize with speed and purpose, drawing upon your unique skills and expertise. The seamless coordination of our efforts is paramount in the face of this impending challenge.
It is incumbent upon us to fortify our defenses and implement contingency plans to ensure the resilience of our critical infrastructure. Time is not a luxury we possess; therefore, every action taken must be deliberate, calculated, and aligned with our overarching mission.
In this pivotal moment, let us rise above the immediate threat and showcase the strength of our collective resolve. The success of our organization hinges on the efficacy of our response to this crisis. Failure to act decisively is not an option, as the consequences could reverberate far beyond our immediate sphere.
Consider this an urgent call to arms, a rallying cry for unity in purpose. We face adversity, but through our combined efforts, we can overcome it. Let us navigate these turbulent waters with a shared commitment to excellence and an unwavering dedication to the security of our critical systems.
As you embark on this mission, know that your contributions matter, and they form an integral part of the shield we are erecting to protect our organization's future. May our actions today echo with the assurance that we met the challenge head-on and emerged stronger.
Go forth with determination, resilience, and the unwavering belief that together, we shall secure the future of our critical systems.

The secret code to our systems is: CTF{cc64393474865290892e5197153ad6109151d8ee2fd5e316d81b80c3d825bd82}

Godspeed.

-----BEGIN PGP SIGNATURE-----

iQGzBAEBCgAdFiEEzPHvlUeruVX0heb1tpW1DotF5QYFAmWo5oMACgkQtpW1DotF
5QY62wwAudnaWyEAHCzLfhoqGRacozcmhagBr+HlPhEOApd6lwIZ01At+Q4Yj5z2
IYk2kpdxe6fZ5pZZoGyMk5TrNQaeHKn+w9hKdNsaQTZSPSgXT9pQ1FyiaYe5tKEf
Zs9g4k+mEbK7uJpVfCBfvMnxiARxyNzvTs4/EEP0/KGxwpuWIrU8Xwz51gZFNJgr
3cjeV6esIxyAoPHSpzvGwC2YA3unsSh9bWS6BjtmOs2As1YC7asbO0dRANcjz//0
mYDAXM1W68ASrHT22COCpv+r5QBD2tPiKrjdMSYGkSXfWsTAf+bfu5VM/nGUKD/n
gShplAr2yLdwWkz6UTMboMZRMK5UfjzumX99ICO3hYL0mU3QQXyFnkXtR0ygcGOy
Xke5v/1O4iNmwmn0G/xBF4s2kfeh9DOFyBJeHtgMuNVXVkZOe2FVDecK9UOR4/7h
Z63mLMvOhlniIcy5HrIUXfz0HQAgVGye7jgDvBJCS9Y2dc+5mcHraFj+FEfL8QIR
K7XNR2Tf\n=pum0
-----END PGP SIGNATURE-----`}
                    />

                </div>
            </div>
            <GoBackButton path="/blog" />
        </div>
    );
};

export default KrotatePost;
