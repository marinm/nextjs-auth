export default function TableNew() {
    return (
        <div>
            <h1>New Table</h1>
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Name"
                    />
                </div>
            </form>
        </div>
    );
}
