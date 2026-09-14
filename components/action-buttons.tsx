type Props = {
  instagramUrl: string;
  mapsUrl: string;
};

export default function ActionButtons({ instagramUrl, mapsUrl }: Props) {
  return (
    <div className="action-buttons">
      <a href={mapsUrl} target="_blank" rel="noreferrer" className="gold-button">
        <span className="button-icon">⌖</span>
        Google Maps
      </a>
      <a href={instagramUrl} target="_blank" rel="noreferrer" className="outline-button">
        <span className="button-icon">◎</span>
        Instagram
      </a>
    </div>
  );
}