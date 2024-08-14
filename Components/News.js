import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { newsAPIKey } from "@env";
const NewsAPI = require('newsapi');
const newsapi = new NewsAPI(newsAPIKey);

function News({ company }) {
   
    const [headline, setHeadline] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        console.log('company name', company);
        const fetchNews = async () => {
            try {
                const response = await newsapi.v2.topHeadlines({
                    sources: 'bbc-news,the-verge',
                    q: company,
                    language: 'en',
                });
                if (response.articles.length > 0) {
                    setHeadline(response.articles[0].description);
                } else {
                    setError(`No news found for ${company}`);
                }
            } catch (err) {
                setError(`Cannot find news for ${company}`);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [company]); // Add company to the dependency array

    return (
        <View style={{ margin: 10, borderWidth: 2, borderColor: 'grey', padding: 10 }}>
            <Text style={{ fontWeight: 'bold' }}>Top news of {company}:</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <Text>{headline || error}</Text>
            )}
        </View>
    );
}

export default News;
