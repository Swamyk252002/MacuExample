package Practice;

public class Duplicate_Values {

	public static void main(String[] args) {
		String s= "this is swamy from Godavarikhani";
		String c=s.replace(" ", "");
		
		
		while(c.length()>0) {
			char ch=c.charAt(0);
			//char c=s1.charAt(0);
			System.out.println("Character Count:"+ch+" "+countchar(c,ch));
			c=c.replace(""+ch, "");
			
		}
		

	}

	private static int countchar( String c,char ch) {
		int count=0;
				while(c.indexOf(ch)>-1) {
					count++;
					c=c.substring(c.indexOf(ch)+1);
				}
		return count;
	}

}
