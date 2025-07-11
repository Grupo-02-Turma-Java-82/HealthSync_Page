export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center text-center text-white bg-[#1a0c05] p-6 rounded-xl shadow-md">
      <svg
        className="w-16 h-16 text-orange-500 mb-4"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.5}
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12h6m-6 4h6m-2-8h.01M12 3c4.97 0 9 4.03 9 9s-4.03 9-9 9S3 16.97 3 12 7.03 3 12 3z"
        />
      </svg>

      <h2 className="text-lg font-semibold mb-2">Nenhum treino disponível</h2>
      <p className="text-sm text-gray-400">
        Você ainda não possui exercícios cadastrados no seu plano de treino.
      </p>
    </div>
  );
}