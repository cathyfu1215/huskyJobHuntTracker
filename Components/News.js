import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { newsAPIKey } from "@env";


function News({ company }) {
    const [headline, setHeadline] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    var requestOptions = {
        method: 'GET'
    };
    
    var params = {
        api_token: newsAPIKey,
        categories: 'business,tech',
        search: 'company',
        limit: '50'
    };
    
    var esc = encodeURIComponent;
    var query = Object.keys(params)
        .map(function(k) {return esc(k) + '=' + esc(params[k]);})
        .join('&');


    useEffect(() => {
        console.log('company name', company);
        const fetchNews =() => {
            
                
            fetch("https://api.thenewsapi.com/v1/news/all?" + query, requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
          
        };

        fetchNews();
    }, []); // Keep the dependency array empty to run only once

    return (
        <View style={{ margin: 10, borderWidth: 2, borderColor: 'grey', padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Top news of {company}:</Text>
            <Text>{headline || error}</Text>
           
        </View>
    );
}

export default News;
