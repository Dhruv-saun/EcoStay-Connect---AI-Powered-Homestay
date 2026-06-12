export default function Login() {
  return (
    <main className="min-h-screen flex justify-center items-center">
      <div className="w-[400px] p-8 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6">
          Login
        </h1>
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Email"
        />
        <input
          className="w-full border p-3 rounded mb-4"
          placeholder="Password"
          type="password"
        />
        <button
          className="w-full bg-green-700 text-white p-3 rounded"
        >
          Login
        </button>
      </div>
    </main>
  );
}
