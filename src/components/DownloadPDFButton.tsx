import { Program } from '@/types/program';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { ProgressTrackingForm, PlayerEvaluationForm } from './PdfTemplates';

interface DownloadPDFButtonProps {
  program: Program;
  position?: string;
  type?: 'program' | 'position' | 'progress' | 'evaluation';
}

export default function DownloadPDFButton({ program, position, type = 'program' }: DownloadPDFButtonProps) {
  const getDocument = () => {
    switch (type) {
      case 'progress':
        return <ProgressTrackingForm program={program} />;
      case 'evaluation':
        return <PlayerEvaluationForm program={program} />;
      case 'position':
        return position ? (
          <ProgramPDF program={program} position={position} />
        ) : null;
      default:
        return <ProgramPDF program={program} />;
    }
  };

  const getButtonText = () => {
    switch (type) {
      case 'progress':
        return 'Download Progress Tracking Form';
      case 'evaluation':
        return 'Download Player Evaluation Form';
      case 'position':
        return `Download ${position} Guide`;
      default:
        return 'Download Program Guide';
    }
  };

  const document = getDocument();
  if (!document) return null;

  return (
    <PDFDownloadLink
      document={document}
      fileName={`${program.title}-${type}${position ? `-${position}` : ''}.pdf`}
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
    >
      {({ loading }) => (loading ? 'Loading document...' : getButtonText())}
    </PDFDownloadLink>
  );
} 