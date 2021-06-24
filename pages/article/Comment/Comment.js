const Comment = ({ name, publication, commentText }) => {
  return (
    <div style={{ marginBottom: 15 }}>
      <h5
        style={{
          fontStyle: 'normal',
          fontWeight: 600,
          fontSize: 22,
          textTransform: 'capitalize',
          marginTop: 10,
          marginBottom: 10,
          color: '#000000',
        }}
      >
        {name}
      </h5>
      <p
        style={{
          fontStyle: 'normal',
          fontSize: 15,
          marginTop: 10,
          marginBottom: 10,
          color: '#000000',
        }}
      >
        {publication}
      </p>
      <p
        style={{
          fontStyle: 'normal',
          fontSize: 15,
          marginTop: 10,
          marginBottom: 10,
          color: '#000000',
        }}
      >
        {commentText}
      </p>
    </div>
  );
};

export default Comment;
