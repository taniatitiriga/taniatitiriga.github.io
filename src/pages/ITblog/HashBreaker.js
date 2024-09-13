//src/pages/ITblog/Post1.js
import React from 'react';
import GoBackButton from '../../components/goBackButton';

const Table = ({ children }) => (
    <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-400 mb-4">
            {children}
        </table>
    </div>
);

const TableHead = ({ children }) => <thead>{children}</thead>;
const TableBody = ({ children }) => <tbody>{children}</tbody>;
const TableRow = ({ children }) => <tr>{children}</tr>;
const TableCell = ({ children }) => (
    <td className="px-4 py-2 border border-gray-400">{children}</td>
);
const TableHeader = ({ children }) => (
    <th className="px-4 py-2 border border-gray-400">{children}</th>
);

const CodeBlock = ({ code }) => (
    <pre className="bg-gray-200 p-2 rounded-lg my-2">
        <code>{code}</code>
    </pre>
);

const Post1 = () => {
    return (
        <div className="bg-gray-100 min-h-screen py-12">
            <div className="max-w-4xl mx-auto px-4">
                <div className="bg-white p-8 rounded-lg shadow-md">
                    <h1 className="text-3xl font-bold mb-4">HashBreaker</h1>
                    {/* Tags */}
                    <div className="flex space-x-2 mb-4">
                        <span className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded">
                            Cryptography
                        </span>
                        <span className="bg-lightwisteria text-indigo text-sm font-medium py-1 px-2 rounded">
                            Reverse Hashing
                        </span>
                    </div>
                    <p className="text-gray-600 mb-4">Event: <a href='https://bsidestransylvania.com/' className='no-underline text-africanviolet hover:text-codepurple' target="_blank" rel="noopener noreferrer">BSides Transylvania 2024</a> | Difficulty: medium | 275 points | 3 solves </p>

                    {/* Introduction */}
                    <h2 className="text-xl font-semibold my-3">Introduction</h2>
                    <p className="mb-4">
                        We are provided by the challenge with 2 things:
                    </p>
                    <ul className="list-disc list-inside mb-4">
                        <li>a hash: "1a061d36422e5a08190009ddfd34d74d603f2f7c384a08b3521c08130d171dcf"</li>
                        <li>and the function used to obtain it:</li>
                    </ul>

                    {/* Code Block */}
                    <CodeBlock
                        code={`def ultrabrend(message):
    if len(message) < 29:
        message = ((message + " ") * 29)[:29]

    digest = [0]*32

    for i in range(len(message)):
        digest[i % 29] ^= ord(message[i])

    t = digest[0] * digest[28]

    for i in range(28):
        digest[i] = (digest[i] + digest[i+1]) % 256

    digest[28] = t // 256
    digest[29] = t % 256
    digest[30] = 0xff ^ len(message)
    digest = digest[16:] + digest[:16]

    for i in range(32):
        digest[i] ^= digest[(i+1) % 32] ^ i

    return "".join(["{:02x}".format(i) for i in digest])


string = input("Enter a message: ")
print("Hash:", ultrabrend(string))`}
                    />
                    Our goal is to obtain the initial message by reversing the hashing function.



                    {/* Explanation */}
                    <h2 className="text-xl font-semibold my-3">First things first, the ending</h2>
                    <p className="mb-4">
                        This is the last operation made on digest[ ], the list returned as hex:
                    </p>
                    <CodeBlock
                        code={`for i in range(32):
    digest[i] ^= digest[(i+1) % 32] ^ i`}
                    />
                    <p className="mb-4">
                        For the theoretical part, let <code>final[ ]</code> be the list we've got, and <code>initial[ ]</code> be the list before being processed by this step.
                    </p>
                    <p className="mb-4">
                        Now, to break it down:
                        <ul className="list-disc list-inside">
                            <li><code>final[0] = initial[0] ^ initial[1] ^ 0,</code></li>
                            <li><code>final[1] = initial[1] ^ initial[2] ^ 1,</code></li>
                            <li>...</li>
                            <li><code>final[30] = initial[30] ^ initial[31] ^ 30</code></li>
                            <li>and for 31, <code>(i+1) % 32</code> will take us back to index 0, which has been modified already:</li>
                            <li><code>final[31] = initial[31] ^ final[0] ^ 31.</code></li>
                        </ul>
                    </p>
                    <p className="mb-0">
                        From here, <code>initial[31]</code> becomes known,
                    </p>
                    <p className="mb-0">
                        <code>initial[31] = final[31] ^ final[0] ^ 31</code>
                    </p>
                    <p className="mb-0">
                        and can be used to find the entire initial list:
                    </p>
                    <p className="mb-0">
                        <code>initial[30] = initial[31] ^ final[30] ^ 30,</code>
                    </p>
                    <p className="mb-0">
                        <code>...</code>
                    </p>
                    <p className="mb-0">
                        <code>initial[0] = initial[1] ^ final[0] ^ 31.</code>

                    </p>
                    <p className="mb-4">
                        Now that we understand what it does, we can reverse it:
                    </p>
                    <CodeBlock
                        code={`digest[31] = digest[31] ^ digest[0] ^ 31

for i in range(30, -1, -1):
    digest[i] = digest[i] ^ digest[i + 1] ^ i`}
                    />

                    <h2 className="text-xl font-semibold my-3">Accessories</h2>
                    <p className="mb-4">
                        The next line (bottom-up) performs something like cutting the deck in cards and can easily be undone by repeating the process.
                    </p>
                    <CodeBlock
                        code={`digest = digest[16:] + digest[:16]`}
                    />
                    <p className="mb-4">
                        The "accessories" we receive next are the length of the message and <code>t</code> (because <code>t = q * 256 + r</code>, where <code>q = t // 256</code> and <code>r = t % 256</code>).
                    </p>
                    <CodeBlock
                        code={`digest[28] = t // 256
digest[29] = t % 256
digest[30] = 0xff ^ len(message)`}
                    />
                    <p className="mb-4">
                        To find the length, xor again: <code>len = digest[30] ^ 255</code>.
                    </p>
                    <p className="mb-4">
                        Our new knowns are <code>t</code>, <code>length</code> and <code>final</code> (the new final, the current one, before being processed at the step presented above). Remember <code>length</code>, it will come in handy later ;).
                    </p>

                    <h2 className="text-xl font-semibold my-3">A little more math</h2>

                    <CodeBlock code={`for i in range(28):
    digest[i] = (digest[i] + digest[i+1]) % 256`} />
                    <p className="mb-4">
                        This (+accessories) modifies the digest:
                    </p>

                    {/* Re-render the table with math details */}
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>List</TableHeader>
                                <TableHeader>0</TableHeader>
                                <TableHeader>1</TableHeader>
                                <TableHeader>...</TableHeader>
                                <TableHeader>27</TableHeader>
                                <TableHeader>28</TableHeader>
                                <TableHeader>29</TableHeader>
                                <TableHeader>30</TableHeader>
                                <TableHeader>31</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>Final</TableCell>
                                <TableCell>x<sub>0</sub> + x<sub>1</sub></TableCell>
                                <TableCell>x<sub>1</sub> + x<sub>2</sub></TableCell>
                                <TableCell>...</TableCell>
                                <TableCell>x<sub>27</sub> + x<sub>28</sub></TableCell>
                                <TableCell>t // 256</TableCell>
                                <TableCell>t % 256</TableCell>
                                <TableCell>length</TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell>Initial</TableCell>
                                <TableCell>x<sub>0</sub></TableCell>
                                <TableCell>x<sub>1</sub></TableCell>
                                <TableCell>...</TableCell>
                                <TableCell>x<sub>27</sub></TableCell>
                                <TableCell>x<sub>28</sub></TableCell>
                                <TableCell>x<sub>29</sub></TableCell>
                                <TableCell>x<sub>30</sub></TableCell>
                                <TableCell>x<sub>31</sub></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>


                    <p className="mb-2">
                        Now we can reconstruct <code>t</code> as <code>final[28] * 256 + final[29]</code>. This variable was initialized before this for, using the <i>initial digest</i>:
                    </p>
                    <CodeBlock
                        code={`t = digest[0] * digest[28]`}
                    />
                    <p className="mb-2">
                        So we know that <code>t = x<sub>0</sub> * x<sub>28</sub></code>.
                    </p>
                    <p className="mb-1">
                        To find a second equation using <code>x<sub>0</sub></code> and <code>x<sub>28</sub></code>, we use <code>final[ ]</code>:
                    </p>
                    <p className="mb-0">
                        <code>final[27] = x<sub>27</sub> + x<sub>28</sub></code>
                    </p>
                    <p className="mb-0">
                        <code>final[26] = x<sub>26</sub> + x<sub>27</sub></code>
                    </p>
                    <p className="mb-0">
                        <code>_______________________________ Subtraction</code>
                    </p>
                    <p className="mb-3">
                        <code>final[27] - final[26] = x<sub>28</sub> - x<sub>26</sub></code>
                    </p>
                    <p className="mb-0">
                        <code>final[27] - final[26] = x<sub>28</sub> - x<sub>26</sub></code>
                    </p>
                    <p className="mb-0">
                        <code>final[25] = x<sub>25</sub> + x<sub>26</sub></code>
                    </p>
                    <p className="mb-0">
                        <code>_______________________________ Addition</code>
                    </p>
                    <p className="mb-3">
                        <code>final[27] - final[26] + final[25] = x<sub>28</sub> + x<sub>25</sub></code>
                    </p>
                    <p className="mb-0">
                        <code>...</code>
                    </p>
                    <p className="mb-2">
                        By subtracting and adding repeatedly, we should obtain <code>x<sub>28</sub> - x<sub>0</sub> = (result)</code>, therefore <code>x<sub>28</sub></code> with regards to <code>x<sub>0</sub></code>:
                    </p>
                    <p className="mb-2">
                        <code>x<sub>28</sub> = (result) + x<sub>0</sub></code>,
                    </p>
                    <p className="mb-2">
                        replace <code>x<sub>28</sub></code> in our first equation,
                    </p>
                    <p className="mb-2">
                        <code>t = x<sub>0</sub> &middot; ((result) + x<sub>0</sub>)</code>
                    </p>
                    <p className="mb-2">
                        and obtain a quadratic equation:
                    </p>
                    <p className="mb-3">
                        <code>x<sub>0</sub><sup>2</sup> + x<sub>0</sub>(result) - t = 0</code>.
                    </p>
                    <p className="mb-2">
                        Here on out, the job is simple, as <code>x<sub>0</sub></code> will probably take a positive value (take a peek above and notice it's just xor'ed ASCII from the message). From <code>x<sub>0</sub></code> and <code>final[0] = x<sub>0</sub> + x<sub>1</sub></code> we find <code>x<sub>1</sub></code> and repeat for all <code>x<sub>i</sub></code>.
                    </p>

                    <h2 className="text-xl font-semibold my-3">Lastly, the beginning</h2>
                    <p className="mb-2">
                        For the last step, there is a message formatting:
                    </p>
                    <CodeBlock
                        code={`if len(message) < 29:
    message = ((message + " ") * 29)[:29]`}
                    />
                    <p className="mb-2">
                        which transforms the message to be <em>at least</em> of length 29, and then the XOR overlay.
                    </p>
                    <CodeBlock
                        code={`digest = [0]*32

for i in range(len(message)):
    digest[i % 29] ^= ord(message[i])`}
                    />

                    <p className="mb-2">
                        The digest (initialized with 0) gets xor'ed with the first 29 characters from the message.
                    </p>
                    <p className='mb-2'> Since <code>a ^ 0 = a</code>, this is equivalent to initializing <code>digest</code> with <code>message[:29]</code> in ASCII. Afterward, the digest index moves back to 0 and continues to xor with the rest of the message.
                    </p>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableHeader>digest</TableHeader>
                                <TableHeader>0</TableHeader>
                                <TableHeader>1</TableHeader>
                                <TableHeader>2</TableHeader>
                                <TableHeader>3</TableHeader>
                                <TableHeader>4</TableHeader>
                                <TableHeader>5</TableHeader>
                                <TableHeader>6</TableHeader>
                                <TableHeader>7</TableHeader>
                                <TableHeader>8</TableHeader>
                                <TableHeader>9</TableHeader>
                                <TableHeader>...</TableHeader>
                                <TableHeader>26</TableHeader>
                                <TableHeader>27</TableHeader>
                                <TableHeader>28</TableHeader>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>m</TableCell>
                                <TableCell>e</TableCell>
                                <TableCell>s</TableCell>
                                <TableCell>s</TableCell>
                                <TableCell>a</TableCell>
                                <TableCell>g</TableCell>
                                <TableCell>e</TableCell>
                                <TableCell>_</TableCell>
                                <TableCell>m</TableCell>
                                <TableCell>e</TableCell>
                                <TableCell>...</TableCell>
                                <TableCell>e</TableCell>
                                <TableCell>s</TableCell>
                                <TableCell>s</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>a</TableCell>
                                <TableCell>g</TableCell>
                                <TableCell>e</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    <p className="my-2">
                        It would be impossible to deduce two random characters which xor'ed are equal to <code>digest[i]</code> and also make sense in the message. However, since the message should be the flag, we can safely presume it starts with <em>MetaCTF&#123;</em>. And because <code>a ^ b = c</code> if and only if <code>a = c ^ b</code>, we can check this presumption by xoring <code>digest&#91; :8&#93;</code> with <em>MetaCTF&#123;</em>.
                    </p>

                    <p className="mb-2">
                        The result was <em>ashabyss</em>, so totally not a coincidence :).<br /> <br />

                        Remember <em>length</em>?
                    </p>
                    <p className="mb-2">
                        Length was smaller than <code>2 &#183; 29</code>, which means there are <em>some</em> letters at the end of <code>digest</code> which were not xored, and <code>len - 29</code> tells us exactly <em>where</em> the raw piece starts.
                    </p>
                    <p className="mb-2">
                        Here we got <em>lags_deep_int0_the_h</em>, which matches <em>ashabyss</em> perfectly. As a cherry on top, <em>f</em> from <em>flags</em> and <em>&#125;</em> xor'ed give <code>digest&#91;8&#93;</code>, confirming the flag:
                    </p>
                    <pre className="mb-3">
                        MetaCTF&#123;flags_deep_int0_the_hashabyss&#125;
                    </pre>



                </div>
            </div>
            <GoBackButton path="/blog" />
        </div>
    );
};

export default Post1;
