import fetch from 'node-fetch';
import https from 'https';

exports.get = async (url) => {
    const httpsAgent = new https.Agent({
        rejectUnauthorized: false,
    });
    const resp = await fetch(
        url,
        {
            agent: httpsAgent,
            method: 'GET'
        },

    )
    const data = await resp.json();

    return data
}

