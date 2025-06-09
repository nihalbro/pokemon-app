export default function PokemonWebsite({ isAdmin }) {
  // your existing code

  return (
    <div>
      {/* your existing UI */}
      {isAdmin && (
        <div className="admin-stats p-4 mt-6 border-t">
          <h2 className="text-xl font-bold mb-2">Admin Stats</h2>
          {/* put admin info here */}
          <p>Welcome, admin! Here are your stats.</p>
        </div>
      )}
    </div>
  );
}
