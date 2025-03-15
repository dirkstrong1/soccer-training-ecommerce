import { Document, Page, Text, View, StyleSheet, PDFDownloadLink } from '@react-pdf/renderer';
import { Program, CurriculumWeek, ScheduleSession, PositionSession } from '@/types/program';
import React, { ReactNode } from 'react';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
  },
  header: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 5,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
  list: {
    marginLeft: 20,
  },
  listItem: {
    fontSize: 12,
    marginBottom: 3,
  },
  drillCard: {
    marginTop: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  drillTitle: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  formSection: {
    marginBottom: 15,
    padding: 10,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  formField: {
    marginBottom: 10,
    padding: 8,
    borderBottomWidth: 1,
    borderColor: '#cccccc',
  },
  formLabel: {
    fontSize: 12,
    marginBottom: 4,
    color: '#666666',
  },
  formInput: {
    height: 20,
    backgroundColor: '#f5f5f5',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  metricBox: {
    width: '45%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  notes: {
    marginTop: 15,
    padding: 10,
    backgroundColor: '#f5f5f5',
  },
  field: {
    marginBottom: 15,
    padding: 10,
    borderBottom: 1,
    borderColor: '#cccccc',
  },
});

interface PdfProps {
  program: Program;
  position?: string;
}

const renderText = (content: string, key?: string | number): JSX.Element => (
  <Text key={key} style={styles.text}>{content}</Text>
);

const renderWeek = (week: CurriculumWeek): JSX.Element => (
  <View key={`week-${week.weekNumber}`} style={styles.field}>
    <Text style={styles.text}>Week {week.weekNumber}</Text>
    <Text style={styles.text}>Focus: {week.focus}</Text>
    <Text style={styles.text}>{week.description}</Text>
    {week.objectives.map((objective: string, j: number) => (
      <Text key={`objective-${week.weekNumber}-${j}`} style={styles.text}>• {objective}</Text>
    ))}
  </View>
);

const renderSession = (session: ScheduleSession, index: number): JSX.Element => (
  <Text key={`session-${index}`} style={styles.text}>
    {session.day}: {session.time} ({session.duration})
  </Text>
);

const renderPositionSession = (session: PositionSession): JSX.Element => (
  <View key={`position-${session.position}`}>
    <Text style={styles.text}>Position: {session.position}</Text>
    <Text style={styles.text}>{session.description}</Text>
    {session.drills.map((drill: string, j: number) => (
      <Text key={`drill-${session.position}-${j}`} style={styles.text}>• {drill}</Text>
    ))}
  </View>
);

export const ProgramPDF: React.FC<PdfProps> = ({ program, position }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{program.title}</Text>
        {position && <Text style={styles.subtitle}>{position} Specific Training</Text>}
        <Text style={styles.subtitle}>Duration: {program.duration}</Text>
        <Text style={styles.subtitle}>Sessions per Week: {program.sessionsPerWeek}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Program Overview</Text>
        <Text style={styles.text}>{program.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Curriculum</Text>
        <View style={styles.list}>
          {program.curriculum.map((item, index) => (
            <Text key={index} style={styles.listItem}>• {item}</Text>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Program Details</Text>
        <View style={styles.field}>
          {renderText(`Age Group: ${program.ageGroup}`)}
          {renderText(`Skill Level: ${program.skillLevel}`)}
          {renderText(`Max Participants: ${program.maxParticipants}`)}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Schedule</Text>
        {program.schedule.sessions.map((session, index) => (
          <Text key={index} style={styles.text}>
            {session.day}: {session.time} ({session.duration})
          </Text>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Equipment Required</Text>
        {program.equipment.map((item, index) => (
          <Text key={index} style={styles.text}>• {item}</Text>
        ))}
      </View>

      {position && program.positionSpecificSessions && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Position-Specific Training</Text>
          {program.positionSpecificSessions
            .filter(session => session.position === position)
            .map((session, index) => (
              <View key={index}>
                <Text style={styles.text}>{session.description}</Text>
                {session.drills.map((drill, drillIndex) => (
                  <Text key={drillIndex} style={styles.text}>• {drill}</Text>
                ))}
              </View>
            ))}
        </View>
      )}
    </Page>
  </Document>
);

// Position-Specific PDF Document
const PositionSpecificPDF: React.FC<{ program: Program; position: string }> = ({ program, position }) => {
  const positionSession = program.positionSpecificSessions?.find(
    session => session.position === position
  );

  if (!positionSession) return null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header}>
          <Text style={styles.title}>{position} Training Plan</Text>
          <Text style={styles.subtitle}>{program.title}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Focus Areas</Text>
          <View style={styles.list}>
            {positionSession.focus.map((item, index) => (
              <Text key={index} style={styles.listItem}>• {item}</Text>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Specialized Drills</Text>
          {positionSession.drills.map((drill, index) => (
            <View key={index} style={styles.drillCard}>
              <Text style={styles.drillTitle}>{drill.name}</Text>
              <Text style={styles.text}>Duration: {drill.duration}</Text>
              <Text style={styles.text}>Description: {drill.description}</Text>
              {drill.progressions && (
                <>
                  <Text style={styles.text}>Progressions:</Text>
                  <View style={styles.list}>
                    {drill.progressions.map((prog, i) => (
                      <Text key={i} style={styles.listItem}>• {prog}</Text>
                    ))}
                  </View>
                </>
              )}
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
};

// Progress Tracking Form Template
const ProgressTrackingPDF: React.FC<{ program: Program }> = ({ program }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Weekly Progress Tracking Form</Text>
        <Text style={styles.subtitle}>{program.title}</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Player Information</Text>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Player Name: _______________________</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Week Number: _____ Date: ___________</Text>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Technical Skills Assessment</Text>
        <View style={styles.metricsGrid}>
          {program.progressTracking.weekly.map((metric, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={styles.formLabel}>{metric}</Text>
              <Text style={styles.formLabel}>Rating (1-5): ____</Text>
              <Text style={styles.formLabel}>Notes: __________</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Session Attendance & Participation</Text>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Sessions Attended: ____ / {program.sessionsPerWeek}</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Effort Level (1-5): ____</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Focus & Attention (1-5): ____</Text>
        </View>
      </View>

      <View style={styles.notes}>
        <Text style={styles.sectionTitle}>Coach's Notes</Text>
        <Text style={styles.text}>Areas of Excellence:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.text}>Areas for Improvement:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
      </View>
    </Page>
  </Document>
);

// Player Evaluation Form Template
const PlayerEvaluationPDF: React.FC<{ program: Program }> = ({ program }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>Player Evaluation Form</Text>
        <Text style={styles.subtitle}>{program.title}</Text>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Player Details</Text>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Name: _______________________</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Position: ____________________</Text>
        </View>
        <View style={styles.formField}>
          <Text style={styles.formLabel}>Evaluation Date: _____________</Text>
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Technical Abilities</Text>
        <View style={styles.metricsGrid}>
          {[
            "Ball Control",
            "Passing Accuracy",
            "First Touch",
            "Shooting",
            "Dribbling",
            "Heading"
          ].map((skill, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={styles.formLabel}>{skill}</Text>
              <Text style={styles.formLabel}>Rating (1-5): ____</Text>
              <Text style={styles.formLabel}>Comments: ________</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Tactical Understanding</Text>
        <View style={styles.metricsGrid}>
          {[
            "Positioning",
            "Decision Making",
            "Game Reading",
            "Team Play"
          ].map((aspect, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={styles.formLabel}>{aspect}</Text>
              <Text style={styles.formLabel}>Rating (1-5): ____</Text>
              <Text style={styles.formLabel}>Comments: ________</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.formSection}>
        <Text style={styles.sectionTitle}>Physical Attributes</Text>
        <View style={styles.metricsGrid}>
          {[
            "Speed",
            "Agility",
            "Stamina",
            "Strength"
          ].map((attribute, index) => (
            <View key={index} style={styles.metricBox}>
              <Text style={styles.formLabel}>{attribute}</Text>
              <Text style={styles.formLabel}>Rating (1-5): ____</Text>
              <Text style={styles.formLabel}>Comments: ________</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.notes}>
        <Text style={styles.sectionTitle}>Development Plan</Text>
        <Text style={styles.text}>Key Strengths:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.text}>Priority Development Areas:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
        <Text style={styles.text}>Recommended Actions:</Text>
        <Text style={styles.formLabel}>_________________________________</Text>
      </View>
    </Page>
  </Document>
);

// Enhanced Download Button Component
export const DownloadPDFButton = ({ 
  program, 
  position,
  type = 'program'
}: { 
  program: Program;
  position?: string;
  type?: 'program' | 'position' | 'progress' | 'evaluation';
}) => {
  const getFileName = () => {
    const baseTitle = program.title.toLowerCase().replace(/\s+/g, '-');
    switch (type) {
      case 'position':
        return `${baseTitle}-${position?.toLowerCase()}-training.pdf`;
      case 'progress':
        return `${baseTitle}-progress-tracking-form.pdf`;
      case 'evaluation':
        return `${baseTitle}-player-evaluation-form.pdf`;
      default:
        return `${baseTitle}-program.pdf`;
    }
  };

  const getDocument = () => {
    switch (type) {
      case 'position':
        return position ? <PositionSpecificPDF program={program} position={position} /> : null;
      case 'progress':
        return <ProgressTrackingPDF program={program} />;
      case 'evaluation':
        return <PlayerEvaluationPDF program={program} />;
      default:
        return <ProgramPDF program={program} position={position} />;
    }
  };

  const getButtonText = () => {
    if (type === 'position') return `Download ${position} Training`;
    if (type === 'progress') return 'Download Progress Tracking Form';
    if (type === 'evaluation') return 'Download Player Evaluation Form';
    return 'Download Program Guide';
  };

  return (
    <PDFDownloadLink
      document={getDocument()}
      fileName={getFileName()}
      className="inline-flex items-center px-4 py-2 bg-[var(--primary-color)] text-white rounded-md hover:opacity-90 transition-opacity"
    >
      {({ loading }) => loading ? 'Preparing PDF...' : getButtonText()}
    </PDFDownloadLink>
  );
}; 