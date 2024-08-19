import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { newsAPIKey } from "@env";

function News() {
    const [headlines, setHeadlines] = useState([]);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        
        const fetchNews = async () => {
            try {
                const response = await fetch(`https://newsapi.org/v2/top-headlines?country=ca&apiKey=${newsAPIKey}`);
                const data = await response.json();
                //console.log('data', data);
                if (data.articles && data.articles.length > 0) {
                    setHeadlines(data.articles.slice(0, 3).map(article => article.title));
                } else {
                    setError('No news found');
                }
            } catch (error) {
                setError('Error fetching news');
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []); // Empty dependency array to fetch news only once

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Top news today:</Text>
            {loading ? <ActivityIndicator size="large" color="#0000ff" /> : (
                headlines.length > 0 ? (
                    <View>
                        {headlines.map((headline, index) => (
                            <Text style={styles.headline} key={index}>• {headline}</Text>
                        ))}
                    </View>
                ) : (
                    <Text style={styles.error}>{error}</Text>
                )
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        margin: 10,
        borderWidth: 2,
        borderColor: 'grey',
        padding: 10,
        backgroundColor: '#d3d3d3', // Light grey background color
        fontFamily: 'Times New Roman',
    },
    header: {
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 10,
        color: 'black',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    headline: {
        fontSize: 16,
        marginBottom: 5,
        color: 'black',
        lineHeight: 24,
    },
    error: {
        color: 'red',
        textAlign: 'center',
    },
});

export default News;
