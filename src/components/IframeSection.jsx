export default function IframeSection({ src, title }) {
  return (
    <div className="iframe-wrapper">
      <iframe
        src={src}
        title={title}
        className="content-iframe"
      />
    </div>
  )
}
