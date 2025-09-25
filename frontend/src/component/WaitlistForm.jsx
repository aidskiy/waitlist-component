import { useState } from 'react';

function WaitlistForm() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setStatus('Invalid email address');
            return;
        }

        try {
            const res = await fetch('/api/waitlist', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (res.status === 200) {
                setStatus('✅ You’ve been added to the waitlist!');
                setEmail('');
            } else if (res.status === 409) {
                setStatus('⚠️ You’re already on the waitlist.');
            } else {
                setStatus(`❌ ${data.error || 'Something went wrong'}`);
            }

        } catch (err) {
            console.error(err);
            setStatus('❌ Server error, try again later.');
        }
    };


    return (
        <form onSubmit={handleSubmit}>
            <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
            />
            <button type="submit">Join Waitlist</button>
            {status && <p>{status}</p>}
        </form>
    );
}

export default WaitlistForm;
