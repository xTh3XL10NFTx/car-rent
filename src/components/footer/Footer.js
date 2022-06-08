const styles = {
    background: 'radial-gradient(#333533, #242423)',
    width: '100%',
    position: 'fixed',
    bottom: 0,
    fontWeight: 'bold',
    textAlign: 'right',
    color: 'white'
};

export function Footer() {
    return (
        <div className="footer" style={styles}>
            @Ivelin Tanev, 1801321093
        </div>
    )
}