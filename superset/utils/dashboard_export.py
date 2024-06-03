import logging
from superset.commands.report.execute import BaseReportState
from superset.reports.models import ReportSchedule
from superset.utils.pdf import build_pdf_from_screenshots

logger = logging.getLogger(__name__)

def export_dashboard() -> bytes:
    report_state = BaseReportState(None, None, None)
    report_state._report_schedule = ReportSchedule
    report_state._report_schedule.force_screenshot = "true"
    report_state._report_schedule.chart_id = 11

    screenshots = report_state._get_tabs_screenshots()
    pdf = build_pdf_from_screenshots(screenshots)
    return pdf
