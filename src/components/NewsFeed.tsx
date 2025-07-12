import React, { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { supabase } from '../supabaseClient';

interface NewsItem {
  id: string;
  title: string;
  content: string;
  source: string;
  impact_level: string;
  timestamp: string;
}

const NewsFeed: React.FC = () => {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const fetchNews = async (page = 0) => {
    const { data } = await supabase
      .from('news_items')
      .select('*')
      .order('timestamp', { ascending: false })
      .range(page * 10, (page + 1) * 10 - 1);
    if (data && data.length > 0) {
      setNews((prev) => [...prev, ...data]);
    } else {
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchNews();
    const subscription = supabase
      .channel('news-channel')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'news_items' }, (payload) => {
        setNews((prev) => [payload.new as NewsItem, ...prev]);
      })
      .subscribe();
    return () => { supabase.removeChannel(subscription); };
  }, []);

  return (
    <InfiniteScroll
      dataLength={news.length}
      next={() => fetchNews(news.length / 10)}
      hasMore={hasMore}
      loader={<h4>Loading...</h4>}
    >
      {news.map((item) => (
        <div key={item.id} className="bg-gray-800 p-4 mb-4 rounded-lg shadow">
          <h3 className="text-lg font-bold">{item.title}</h3>
          <p className="text-sm text-gray-400">{item.source} - {new Date(item.timestamp).toLocaleString()}</p>
          <p>{item.content}</p>
          <span className={`px-2 py-1 rounded ${item.impact_level === 'high' ? 'bg-red-500' : 'bg-green-500'}`}>
            {item.impact_level.toUpperCase()}
          </span>
          <button className="ml-2" onClick={() => {
            const sound = new Howler.Howl({ src: ['/sounds/quake.mp3'], volume: 0.5 });
            sound.play();
          }}>Play Alert</button>
        </div>
      ))}
    </InfiniteScroll>
  );
};

export default NewsFeed;
