package beans;

import java.util.Objects;

public class Entry {
    private double xValue;
    private double yValue;
    private double rValue;
    private String currentTime;
    private String executionTime;
    private boolean hitResult;
    public Entry(){
        this(0.0, 0.0, 0.0, "", "", false);
    }
    public Entry(double xValue, double yValue, double rValue, String currentTime, String executionTime, boolean hitResult){
        this.xValue = xValue;
        this.yValue = yValue;
        this.rValue = rValue;
        this.currentTime = currentTime;
        this.executionTime = executionTime;
        this.hitResult = hitResult;
    }
    public double getxValue() {
        return xValue;
    }
    public void setxValue(double xValue) {
        this.xValue = xValue;
    }
    public double getyValue() {
        return yValue;
    }
    public void setyValue(double yValue) {
        this.yValue = yValue;
    }
    public double getrValue() {
        return rValue;
    }
    public void setrValue(double rValue) {
        this.rValue = rValue;
    }
    public String getCurrentTime() {
        return currentTime;
    }
    public void setCurrentTime(String currentTime) {
        this.currentTime = currentTime;
    }
    public String getExecutionTime() {
        return executionTime;
    }
    public void setExecutionTime(String executionTime) {
        this.executionTime = executionTime;
    }
    public boolean isHitResult() {
        return hitResult;
    }
    public void setHitResult(boolean hitResult) {
        this.hitResult = hitResult;
    }

    @Override
    public boolean equals(Object o){
        if(this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Entry entry = (Entry) o;
        if (Double.compare(entry.xValue, xValue) != 0) return false;
        if (Double.compare(entry.yValue, yValue) != 0) return false;
        if (Double.compare(entry.rValue, rValue) != 0) return false;
        if (hitResult != entry.hitResult) return false;
        if(!Objects.equals(currentTime, entry.currentTime)) return false;
        return Objects.equals(executionTime, entry.executionTime);
    }

    @Override
    public int hashCode(){
        int result;
        long temp;
        temp = Double.doubleToLongBits(xValue);
        result = (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(yValue);
        result = 31 * (int) (temp ^ (temp >>> 32));
        temp = Double.doubleToLongBits(rValue);
        result = 31 * (int) (temp ^ (temp >>> 32));
        result = 31 * result + (currentTime != null ? currentTime.hashCode() : 0);
        result = 31 * result + (executionTime != null ? executionTime.hashCode() : 0);
        result = 31 * result + (hitResult ? 1 : 0);
        return result;
    }
    @Override
    public String toString(){
        return "Entry{" +
                "xVal=" + xValue +
                ", yVal=" + yValue +
                ", rVal=" + rValue +
                ", currentTime='" + currentTime + '\'' +
                ", executionTime='" + executionTime + '\'' +
                ", hitResult=" + hitResult +
                '}';
    }
}
